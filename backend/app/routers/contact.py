"""
Contact Us Router for Matrix Innovations Backend.

Endpoints:
1. POST /api/contact:
   - Public endpoint for submitting the Contact Us form from the React frontend.
   - Validates data via Pydantic (ContactCreateRequest).
   - Sanitizes text inputs against XSS.
   - Applies lightweight rate limiting against spam.
   - Saves submission to MongoDB Atlas 'contact_messages' collection.
   - Never leaks database secrets on error.

2. GET /api/contact:
   - Administrative endpoint with pagination.
   - Protected by ADMIN_API_KEY.
   - Returns submitted messages sorted chronologically (newest first).

3. GET /api/contact/{message_id}:
   - Administrative endpoint to view a specific contact submission.
   - Protected by ADMIN_API_KEY.

4. DELETE /api/contact/{message_id}:
   - Administrative endpoint to delete a contact submission.
   - Protected by ADMIN_API_KEY.
"""

import logging
from datetime import datetime, timezone
from typing import Optional
from bson import ObjectId
from bson.errors import InvalidId
from fastapi import APIRouter, Depends, HTTPException, Query, Request, status, BackgroundTasks
from pymongo.errors import PyMongoError

from app.database import get_contact_collection, DatabaseUnavailableError
from app.utils.email_notifier import send_contact_email_to_admin
from app.schemas import (
    ContactCreateRequest,
    ContactCreateResponse,
    ContactListResponse,
    ContactMessageOut,
    ApiResponse
)
from app.utils.security import verify_admin_key, check_rate_limit, sanitize_text

logger = logging.getLogger("matrix_backend.contact")

router = APIRouter(prefix="/api/contact", tags=["Contact Submissions"])


def format_doc_to_schema(doc: dict) -> ContactMessageOut:
    """Helper to convert MongoDB BSON document to clean Pydantic model."""
    created_at_val = doc.get("created_at")
    if isinstance(created_at_val, datetime):
        created_at_str = created_at_val.isoformat()
    else:
        created_at_str = str(created_at_val or "")

    return ContactMessageOut(
        id=str(doc.get("_id")),
        name=doc.get("name", ""),
        email=doc.get("email", ""),
        phone=doc.get("phone"),
        subject=doc.get("subject", "General Inquiry"),
        message=doc.get("message", ""),
        created_at=created_at_str,
        status=doc.get("status", "new")
    )


# ==============================================================================
# Public Endpoint: Submit Contact Form
# ==============================================================================

@router.post(
    "",
    response_model=ContactCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit Contact Inquiry",
    description="Public endpoint to submit a message from the React website Contact Us form."
)
async def submit_contact_form(
    payload: ContactCreateRequest,
    request: Request,
    background_tasks: BackgroundTasks
):
    """
    Submits a new contact message:
    1. Checks IP rate limit (prevents spam abuse).
    2. Sanitizes input fields (prevents stored XSS).
    3. Saves into MongoDB Atlas collection 'contact_messages'.
    4. Triggers background email notification to admin if SMTP is configured.
    5. Returns confirmation with generated message ID.
    """
    # 1. Rate limiting check
    check_rate_limit(request)

    # 2. Input sanitization
    sanitized_name = sanitize_text(payload.name)
    sanitized_subject = sanitize_text(payload.subject or "General Inquiry")
    sanitized_message = sanitize_text(payload.message)
    sanitized_phone = sanitize_text(payload.phone) if payload.phone else None

    # Prepare document for MongoDB
    new_message_doc = {
        "name": sanitized_name,
        "email": payload.email,
        "phone": sanitized_phone,
        "subject": sanitized_subject,
        "message": sanitized_message,
        "created_at": datetime.now(timezone.utc),
        "status": "new"
    }

    # 3. Database persistence
    try:
        collection = get_contact_collection()
        result = collection.insert_one(new_message_doc)
        inserted_id = str(result.inserted_id)
        logger.info("Successfully saved contact message id=%s from %s", inserted_id, payload.email)

        # 4. Trigger asynchronous admin notification (non-blocking)
        background_tasks.add_task(send_contact_email_to_admin, new_message_doc)

        return ContactCreateResponse(
            success=True,
            message="Your message has been submitted successfully.",
            message_id=inserted_id
        )

    except DatabaseUnavailableError as db_unavail:
        logger.error("Database unavailable while saving contact message: %s", db_unavail)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Contact database service is currently unavailable. Please try again later or email info@matrixinnovations.in directly."
        )
    except PyMongoError as mongo_err:
        logger.error("MongoDB error during contact insertion: %s", type(mongo_err).__name__)
        # Never leak connection details or internal driver traces to the user
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while saving your message. Please try again later."
        )
    except Exception as err:
        logger.error("Unexpected error saving contact message: %s", type(err).__name__)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred. Please try again later."
        )


# ==============================================================================
# Admin Endpoint: List Contact Messages (Paginated)
# ==============================================================================

@router.get(
    "",
    response_model=ContactListResponse,
    summary="List Contact Messages (Admin Only)",
    description="Retrieves submitted messages with pagination. Protected by ADMIN_API_KEY."
)
async def list_contact_messages(
    page: int = Query(default=1, ge=1, description="Page number starting at 1"),
    limit: int = Query(default=10, ge=1, le=100, description="Items per page (max 100)"),
    status_filter: Optional[str] = Query(default=None, description="Optional status filter: 'new', 'read', 'archived'"),
    _authenticated: bool = Depends(verify_admin_key)
):
    """
    Administrative endpoint to view submitted messages.
    Supports pagination and sorting by creation timestamp (descending).
    """
    try:
        collection = get_contact_collection()
        
        query = {}
        if status_filter:
            query["status"] = status_filter.strip().lower()

        total = collection.count_documents(query)
        skip = (page - 1) * limit

        cursor = collection.find(query).sort("created_at", -1).skip(skip).limit(limit)
        messages = [format_doc_to_schema(doc) for doc in cursor]

        return ContactListResponse(
            success=True,
            total=total,
            page=page,
            limit=limit,
            messages=messages
        )

    except DatabaseUnavailableError as db_unavail:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(db_unavail)
        )
    except Exception as err:
        logger.error("Error retrieving contact messages: %s", err)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve contact messages."
        )


# ==============================================================================
# Admin Endpoint: Retrieve Single Contact Message
# ==============================================================================

@router.get(
    "/{message_id}",
    response_model=ContactMessageOut,
    summary="Get Single Contact Message (Admin Only)",
    description="Retrieves a specific contact message by ID. Protected by ADMIN_API_KEY."
)
async def get_contact_message(
    message_id: str,
    _authenticated: bool = Depends(verify_admin_key)
):
    """
    Administrative endpoint to fetch one message by its MongoDB ObjectId.
    """
    if not ObjectId.is_valid(message_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid message_id format. Must be a 24-character hexadecimal string."
        )

    try:
        collection = get_contact_collection()
        doc = collection.find_one({"_id": ObjectId(message_id)})
        
        if not doc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Contact message with ID '{message_id}' not found."
            )

        return format_doc_to_schema(doc)

    except HTTPException:
        raise
    except DatabaseUnavailableError as db_unavail:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(db_unavail)
        )
    except Exception as err:
        logger.error("Error retrieving contact message id=%s: %s", message_id, err)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve contact message."
        )


# ==============================================================================
# Admin Endpoint: Delete Contact Message
# ==============================================================================

@router.delete(
    "/{message_id}",
    response_model=ApiResponse,
    summary="Delete Contact Message (Admin Only)",
    description="Permanently removes a contact submission by ID. Protected by ADMIN_API_KEY."
)
async def delete_contact_message(
    message_id: str,
    _authenticated: bool = Depends(verify_admin_key)
):
    """
    Administrative endpoint to delete a contact message by its MongoDB ObjectId.
    """
    if not ObjectId.is_valid(message_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid message_id format. Must be a 24-character hexadecimal string."
        )

    try:
        collection = get_contact_collection()
        result = collection.delete_one({"_id": ObjectId(message_id)})

        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Contact message with ID '{message_id}' not found."
            )

        logger.info("Admin successfully deleted contact message id=%s", message_id)
        return ApiResponse(
            success=True,
            message=f"Contact message '{message_id}' was deleted successfully."
        )

    except HTTPException:
        raise
    except DatabaseUnavailableError as db_unavail:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(db_unavail)
        )
    except Exception as err:
        logger.error("Error deleting contact message id=%s: %s", message_id, err)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete contact message."
        )
