"""
Security and Authentication Utilities for Matrix Innovations Backend.

Features:
1. Admin Authentication:
   - Protects admin endpoints with an API key via header 'X-Admin-API-Key' or 'Authorization: Bearer <key>'.
   - Uses constant-time comparison (secrets.compare_digest) to prevent timing side-channel attacks.
   - Safely prevents admin endpoints from running if ADMIN_API_KEY is unconfigured.
2. Lightweight Anti-Spam / Rate Limiting:
   - Tracks submission counts per client IP to prevent automated form spam.
3. Input Sanitization:
   - Strips malicious HTML/script tags from user inputs to prevent stored XSS attacks.
"""

import html
import re
import secrets
import time
from typing import Optional, Dict, Tuple
from fastapi import Request, HTTPException, status, Security
from fastapi.security import APIKeyHeader, HTTPBearer, HTTPAuthorizationCredentials

from app.config import get_settings

# Security scheme definitions for OpenAPI / Swagger UI
api_key_header_scheme = APIKeyHeader(name="X-Admin-API-Key", auto_error=False)
http_bearer_scheme = HTTPBearer(auto_error=False)

# In-memory IP tracking for anti-spam rate limiting: { ip: [timestamp1, timestamp2, ...] }
_ip_request_timestamps: Dict[str, list] = {}
RATE_LIMIT_WINDOW_SECONDS = 600  # 10 minutes
RATE_LIMIT_MAX_REQUESTS = 6     # Maximum 6 contact submissions per 10 minutes per IP


def sanitize_text(text: str) -> str:
    """
    Sanitizes string inputs to prevent HTML/script injection before saving to database.
    Escapes HTML entities and trims excessive whitespaces.
    """
    if not text:
        return ""
    # Strip dangerous HTML tags
    cleaned = re.sub(r"<[^>]*?>", "", text)
    # Escape HTML special characters
    cleaned = html.escape(cleaned, quote=True)
    return cleaned.strip()


def check_rate_limit(request: Request) -> None:
    """
    Lightweight rate limiter for public submission endpoints.
    Throws HTTP 429 Too Many Requests if an IP submits too many contact forms.
    """
    # Extract client IP, taking into account X-Forwarded-For if behind a proxy like Vercel
    forwarded_for = request.headers.get("x-forwarded-for")
    if forwarded_for:
        client_ip = forwarded_for.split(",")[0].strip()
    else:
        client_ip = request.client.host if request.client else "unknown_ip"

    now = time.time()
    cutoff = now - RATE_LIMIT_WINDOW_SECONDS

    timestamps = _ip_request_timestamps.get(client_ip, [])
    # Filter out timestamps older than the window
    timestamps = [ts for ts in timestamps if ts > cutoff]

    settings = get_settings()
    max_requests = 100 if settings.ENVIRONMENT.lower() == "development" else RATE_LIMIT_MAX_REQUESTS

    if len(timestamps) >= max_requests:
        retry_after = int(RATE_LIMIT_WINDOW_SECONDS - (now - timestamps[0]))
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Too many contact submissions from your IP. Please try again in {max(retry_after, 1)} seconds."
        )

    # Append current timestamp and save
    timestamps.append(now)
    _ip_request_timestamps[client_ip] = timestamps


def verify_admin_key(
    header_key: Optional[str] = Security(api_key_header_scheme),
    bearer_creds: Optional[HTTPAuthorizationCredentials] = Security(http_bearer_scheme)
) -> bool:
    """
    Dependency to verify administrative access.
    Supports either:
    1. Header: X-Admin-API-Key: <ADMIN_API_KEY>
    2. Header: Authorization: Bearer <ADMIN_API_KEY>

    Uses secrets.compare_digest for constant-time comparison.
    """
    settings = get_settings()
    configured_key = settings.ADMIN_API_KEY

    # If the admin key is not set or empty, reject with a safe server error
    if not configured_key or configured_key.strip() == "":
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Admin access is disabled because ADMIN_API_KEY is not configured on the server."
        )

    # Extract key from either header
    provided_key: Optional[str] = None
    if header_key:
        provided_key = header_key.strip()
    elif bearer_creds and bearer_creds.credentials:
        provided_key = bearer_creds.credentials.strip()

    if not provided_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing administrative credentials. Provide 'X-Admin-API-Key' or 'Authorization: Bearer <key>'.",
            headers={"WWW-Authenticate": "Bearer"}
        )

    # Constant-time comparison prevents timing attacks
    if not secrets.compare_digest(provided_key, configured_key):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid administrative API key.",
            headers={"WWW-Authenticate": "Bearer"}
        )

    return True
