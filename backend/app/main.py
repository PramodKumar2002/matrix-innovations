"""
Main FastAPI Application Entry Point for Matrix Innovations.

Configures:
- FastAPI application metadata and OpenAPI documentation (/docs, /redoc, /openapi.json)
- CORS middleware with explicit allowed origins
- Application lifespan (connection pooling and graceful shutdown)
- Custom global exception handlers for user-friendly error responses
- API router registration (/api/health, /api/contact, /api/services)
"""

import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.config import get_settings
from app.database import get_mongo_client, close_mongo_connection
from app.routers import health, contact, services

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("matrix_backend")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager.
    Runs on startup and shutdown in long-running local environments (Uvicorn).
    In serverless environments, module-level singletons persist between warm invocations.
    """
    settings = get_settings()
    logger.info("Starting Matrix Innovations API (Environment: %s)...", settings.ENVIRONMENT)

    # Attempt initial connection to MongoDB if URI is configured
    if settings.MONGODB_URI:
        try:
            get_mongo_client()
        except Exception as err:
            logger.warning("Initial MongoDB connection attempt deferred: %s", err)
    else:
        logger.warning("MONGODB_URI is not set. Contact submissions will fail until configured.")

    yield

    # Clean shutdown
    logger.info("Shutting down Matrix Innovations API...")
    close_mongo_connection()


# Initialize FastAPI Application
settings = get_settings()

app = FastAPI(
    title="Matrix Innovations API",
    description=(
        "REST API backend for Matrix Innovations (Lucknow, India). "
        "Provides services catalog, contact inquiry submission, administrative message management, "
        "and health diagnostic endpoints. Built with FastAPI, Pydantic, and MongoDB Atlas."
    ),
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan
)


# ==============================================================================
# CORS Configuration
# ==============================================================================
# Cross-Origin Resource Sharing allows your React Vite frontend (running on a different port or domain)
# to safely communicate with this FastAPI backend without browser CORS blocking.
origins = settings.cors_origins
logger.info("Configured CORS allowed origins: %s", origins)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    max_age=600  # Cache preflight response for 10 minutes
)


# ==============================================================================
# Global Exception Handlers
# ==============================================================================

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """
    Transforms Pydantic validation errors into clean, friendly JSON responses.
    """
    errors_list = []
    for error in exc.errors():
        field_loc = " -> ".join([str(loc) for loc in error.get("loc", []) if loc != "body"])
        message = error.get("msg", "Invalid value")
        errors_list.append(f"{field_loc}: {message}" if field_loc else message)

    # 422 Unprocessable Content / Entity
    status_code = getattr(status, "HTTP_422_UNPROCESSABLE_CONTENT", status.HTTP_422_UNPROCESSABLE_ENTITY)
    return JSONResponse(
        status_code=status_code,
        content={
            "success": False,
            "message": "Input validation failed. Please review the highlighted fields.",
            "errors": errors_list
        }
    )


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    """
    Standardizes HTTP error responses (e.g. 401, 403, 404, 429, 503).
    """
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "message": exc.detail
        },
        headers=exc.headers
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    """
    Safely catches unhandled exceptions so no secrets, credentials, or internal stack traces leak.
    """
    logger.exception("Unhandled server exception processing request %s %s: %s", request.method, request.url.path, exc)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "message": "An unexpected internal server error occurred. Please try again later."
        }
    )


# ==============================================================================
# Root & Information Endpoints
# ==============================================================================

@app.get(
    "/",
    tags=["Root"],
    summary="API Root Information",
    description="Returns basic information about Matrix Innovations API with links to documentation."
)
async def api_root():
    """Welcome endpoint providing documentation links."""
    return {
        "success": True,
        "name": "Matrix Innovations API",
        "description": "Enterprise Technology & Training Services Backend",
        "documentation": "/docs",
        "health": "/api/health",
        "services": "/api/services"
    }


# ==============================================================================
# Register Application Routers
# ==============================================================================

app.include_router(health.router)
app.include_router(contact.router)
app.include_router(services.router)
