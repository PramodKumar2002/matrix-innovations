"""
Configuration Module for Matrix Innovations Backend.

This module centralizes all environment variables and application settings using
Pydantic's BaseSettings and python-dotenv.

Data Flow:
Local dev: Reads from .env file (if present) -> BaseSettings -> Application
Production (Vercel): Reads from process environment variables -> BaseSettings -> Application
"""

import os
from functools import lru_cache
from pathlib import Path
from typing import List, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

# Determine path to the backend directory and potential .env files
BACKEND_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BACKEND_DIR / ".env"


class Settings(BaseSettings):
    """
    Application Settings schema with automatic type validation and default values.
    """
    model_config = SettingsConfigDict(
        env_file=str(ENV_PATH) if ENV_PATH.exists() else None,
        env_file_encoding="utf-8",
        extra="ignore"
    )

    # Application details
    APP_NAME: str = "Matrix Innovations Backend API"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = Field(default="development", description="Environment: development, test, or production")
    PORT: int = Field(default=8000, description="Local port for Uvicorn development server")

    # MongoDB Atlas credentials
    MONGODB_URI: Optional[str] = Field(
        default="",
        description="MongoDB Atlas connection URI string (e.g. mongodb+srv://...)"
    )
    MONGODB_DATABASE: str = Field(
        default="matrix_innovations",
        description="MongoDB Database name where collections reside"
    )

    # Security: Admin API key for protected administration endpoints
    ADMIN_API_KEY: str = Field(
        default="",
        description="Secret API key required to access /api/contact administrative endpoints"
    )

    # CORS origins: comma-separated string or list
    ALLOWED_ORIGINS: str = Field(
        default="http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000",
        description="Comma-separated list of allowed frontend origins for CORS"
    )

    # Optional Email Notification to Admin via SMTP (e.g. Gmail, SendGrid, Mailgun)
    SMTP_HOST: Optional[str] = Field(default="", description="SMTP host server (e.g. smtp.gmail.com)")
    SMTP_PORT: int = Field(default=587, description="SMTP port (typically 587 for TLS or 465 for SSL)")
    SMTP_USER: Optional[str] = Field(default="", description="SMTP username / email address")
    SMTP_PASSWORD: Optional[str] = Field(default="", description="SMTP app password or API key")
    SMTP_USE_TLS: bool = Field(default=True, description="Enable STARTTLS for SMTP connection")
    ADMIN_NOTIFICATION_EMAIL: Optional[str] = Field(
        default="info@matrixinnovations.in",
        description="Admin email address where contact inquiries should be delivered"
    )

    @property
    def cors_origins(self) -> List[str]:
        """
        Parses the comma-separated ALLOWED_ORIGINS string into a clean list of URLs.
        Example: "http://localhost:5173,https://my-app.vercel.app" -> ["http://localhost:5173", "https://my-app.vercel.app"]
        """
        if not self.ALLOWED_ORIGINS:
            return ["*"]
        
        origins = [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]
        return origins if origins else ["*"]

    @property
    def is_production(self) -> bool:
        """Helper to determine whether the app is running in production."""
        return self.ENVIRONMENT.lower() == "production"


@lru_cache()
def get_settings() -> Settings:
    """
    Returns a cached instance of the application Settings.
    Cached with @lru_cache so environment variables are parsed only once.
    """
    return Settings()
