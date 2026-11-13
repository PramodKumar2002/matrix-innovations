"""
Health Check Router for Matrix Innovations Backend.

Endpoints:
- GET /api/health: Public liveness check confirming backend is running.
- GET /api/health/db: Diagnostic check for MongoDB Atlas connectivity.
"""

from fastapi import APIRouter, status, Response
from app.config import get_settings
from app.database import ping_database
from app.schemas import HealthResponse, DatabaseHealthResponse

router = APIRouter(prefix="/api/health", tags=["Health & Status"])


@router.get(
    "",
    response_model=HealthResponse,
    summary="Backend Health Check",
    description="Returns JSON confirming that the Matrix Innovations FastAPI backend is running and operational."
)
async def get_health():
    """
    Public health check endpoint.
    Used by uptime monitors, load balancers, and frontend diagnostics.
    """
    settings = get_settings()
    return {
        "success": True,
        "message": "Matrix Innovations Python backend is running",
        "environment": settings.ENVIRONMENT,
        "version": settings.APP_VERSION
    }


@router.get(
    "/db",
    response_model=DatabaseHealthResponse,
    summary="Database Connectivity Check",
    description="Performs a lightweight ping check to MongoDB Atlas without exposing credentials or internal traces."
)
async def get_database_health(response: Response):
    """
    Database connectivity check endpoint.
    Verifies that the MongoDB Atlas cluster is reachable and responsive.
    """
    diag = ping_database()
    is_connected = diag["status"] == "connected"

    # Set appropriate HTTP status code if database is disconnected
    if not is_connected:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE

    return {
        "success": is_connected,
        "status": diag["status"],
        "database": diag["database"],
        "message": diag["message"]
    }
