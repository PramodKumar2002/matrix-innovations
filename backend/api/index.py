"""
Vercel Serverless Python Function Entry Point for Matrix Innovations.

When deploying on Vercel:
- Vercel's Python runtime detects ASGI applications and routes incoming HTTP requests to this exported 'app'.
- Adding the parent directory to sys.path ensures the 'app' module imports reliably regardless of working directory.
"""

import sys
from pathlib import Path

# Resolve path to backend folder
api_dir = Path(__file__).resolve().parent        # backend/api
backend_dir = api_dir.parent                    # backend

# Ensure backend root is on sys.path
for directory in (str(backend_dir), str(api_dir)):
    if directory not in sys.path:
        sys.path.insert(0, directory)

# Import the configured FastAPI application instance
from app.main import app  # noqa: E402

# Export for Vercel Python runtime
__all__ = ["app"]
