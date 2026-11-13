"""
Pydantic Request and Response Schemas for Matrix Innovations API.

Pydantic handles:
1. Automatic data parsing & conversion (e.g. JSON strings to Python types)
2. Strict validation rules (min/max lengths, email patterns, phone patterns)
3. Clear automatic validation error messages for the frontend
4. Serialization of response objects
"""

import re
from datetime import datetime
from typing import List, Optional, Any
from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator


# ==============================================================================
# Generic & Health Schemas
# ==============================================================================

class ApiResponse(BaseModel):
    """Standard success/error response structure."""
    success: bool = True
    message: str


class HealthResponse(BaseModel):
    """Response returned by GET /api/health."""
    success: bool = True
    message: str
    environment: Optional[str] = None
    version: Optional[str] = None


class DatabaseHealthResponse(BaseModel):
    """Response returned by GET /api/health/db."""
    success: bool
    status: str
    database: str
    message: str


# ==============================================================================
# Contact Form Schemas
# ==============================================================================

# Regex allowing standard international phone formats (+91 98765 43210, 9876543210, etc.)
PHONE_REGEX = re.compile(r"^[\d+\-\s()]{7,20}$")


class ContactCreateRequest(BaseModel):
    """
    Validation schema for new contact message submissions (POST /api/contact).
    Supports both 'name' and 'fullName' to seamlessly match React state.
    """
    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Full name of the sender",
        examples=["Rahul Sharma"]
    )
    email: EmailStr = Field(
        ...,
        max_length=255,
        description="Valid email address for replies",
        examples=["rahul@example.com"]
    )
    phone: Optional[str] = Field(
        default=None,
        max_length=25,
        description="Optional contact telephone or WhatsApp number",
        examples=["+91 98765 43210"]
    )
    subject: Optional[str] = Field(
        default="General Inquiry",
        max_length=120,
        description="Inquiry subject or interested service",
        examples=["Web Development"]
    )
    message: str = Field(
        ...,
        min_length=10,
        max_length=3000,
        description="Detailed inquiry message (min 10 characters, max 3000)",
        examples=["I would like to discuss building an enterprise web application with React and FastAPI."]
    )

    @model_validator(mode="before")
    @classmethod
    def handle_full_name_alias(cls, values: Any) -> Any:
        """
        Allows frontend submissions using 'fullName' to seamlessly map to 'name'.
        """
        if isinstance(values, dict):
            if "fullName" in values and "name" not in values:
                values["name"] = values["fullName"]
        return values

    @field_validator("name")
    @classmethod
    def sanitize_name(cls, v: str) -> str:
        cleaned = v.strip()
        if len(cleaned) < 2:
            raise ValueError("Name must be at least 2 characters long after trimming whitespace.")
        return cleaned

    @field_validator("email")
    @classmethod
    def sanitize_email(cls, v: str) -> str:
        return v.strip().lower()

    @field_validator("phone")
    @classmethod
    def sanitize_phone(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return None
        cleaned = v.strip()
        if not cleaned:
            return None
        if not PHONE_REGEX.match(cleaned):
            raise ValueError("Phone number must contain between 7 and 20 valid characters (digits, +, -, spaces, parentheses).")
        return cleaned

    @field_validator("subject")
    @classmethod
    def sanitize_subject(cls, v: Optional[str]) -> str:
        if v is None or not v.strip():
            return "General Inquiry"
        return v.strip()

    @field_validator("message")
    @classmethod
    def sanitize_message(cls, v: str) -> str:
        cleaned = v.strip()
        if len(cleaned) < 10:
            raise ValueError("Message must contain at least 10 characters.")
        return cleaned


class ContactCreateResponse(BaseModel):
    """Success response returned to user after submitting contact form."""
    success: bool = True
    message: str = "Your message has been submitted successfully."
    message_id: Optional[str] = None


class ContactMessageOut(BaseModel):
    """Representation of a contact message for authenticated administrators."""
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    subject: str
    message: str
    created_at: str
    status: str = "new"


class ContactListResponse(BaseModel):
    """Paginated response for authenticated admin contact message queries."""
    success: bool = True
    total: int
    page: int
    limit: int
    messages: List[ContactMessageOut]


# ==============================================================================
# Services Schemas
# ==============================================================================

class ServiceItem(BaseModel):
    """Data schema representing a Matrix Innovations service item."""
    id: str
    title: str
    desc: str
    tags: List[str]
    color: Optional[str] = None
    glow: Optional[str] = None


class ServicesListResponse(BaseModel):
    """Response returned by GET /api/services."""
    success: bool = True
    services: List[ServiceItem]
