"""
Database Management Module for Matrix Innovations Backend.

This module handles persistent connections to MongoDB Atlas using PyMongo.
It is specifically designed for both local development and Vercel serverless environments:
- Client reuse across warm serverless function invocations (singleton pattern)
- Safe connection timeouts so requests never hang indefinitely
- Graceful handling when MONGODB_URI is not yet configured or Atlas is temporarily unreachable
- Zero leakage of connection secrets or credentials
"""

import logging
from typing import Optional, Any, Dict
from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError, PyMongoError

from app.config import get_settings

logger = logging.getLogger("matrix_backend.database")

# Global singleton client instance (persisted in serverless memory for warm containers)
_mongo_client: Optional[MongoClient] = None


class DatabaseError(Exception):
    """Safe user-facing exception for database-related errors."""
    pass


class DatabaseUnavailableError(DatabaseError):
    """Raised when MongoDB Atlas is unreachable or not configured."""
    pass


def get_mongo_client() -> Optional[MongoClient]:
    """
    Retrieves or establishes a singleton MongoClient connection.
    Reuses existing connections across requests in both local and serverless execution.
    """
    global _mongo_client
    settings = get_settings()

    if not settings.MONGODB_URI or settings.MONGODB_URI.strip() == "":
        logger.warning("MONGODB_URI is not set. Database operations will be unavailable.")
        return None

    if _mongo_client is None:
        try:
            logger.info("Initializing new MongoDB Atlas client connection...")
            _mongo_client = MongoClient(
                settings.MONGODB_URI,
                serverSelectionTimeoutMS=5000,  # 5-second timeout for server selection
                connectTimeoutMS=5000,          # 5-second timeout for initial socket connection
                socketTimeoutMS=10000,          # 10-second timeout for operations
                maxPoolSize=20,                 # Connection pool suitable for serverless / small instances
                minPoolSize=0,
                appName="MatrixInnovationsAPI"
            )
            # Lightweight ping to verify credentials and connectivity during initialization
            _mongo_client.admin.command("ping")
            logger.info("Successfully connected to MongoDB Atlas.")
        except (ConnectionFailure, ServerSelectionTimeoutError) as err:
            logger.error("Failed to connect to MongoDB Atlas within timeout: %s", type(err).__name__)
            # Reset client so next request attempts a fresh reconnect
            _mongo_client = None
            return None
        except Exception as err:
            logger.error("Unexpected error initializing MongoDB Atlas client: %s", type(err).__name__)
            _mongo_client = None
            return None

    return _mongo_client


def get_database() -> Optional[Database]:
    """
    Returns the target MongoDB database instance.
    Returns None if the client connection cannot be established.
    """
    client = get_mongo_client()
    if client is None:
        return None
    settings = get_settings()
    return client[settings.MONGODB_DATABASE]


def get_contact_collection() -> Collection:
    """
    Returns the 'contact_messages' MongoDB collection.
    Raises DatabaseUnavailableError if the database is not configured or unavailable.
    """
    db = get_database()
    if db is None:
        raise DatabaseUnavailableError(
            "Database service is currently unavailable. Please verify MONGODB_URI configuration."
        )
    return db["contact_messages"]


def ping_database() -> Dict[str, Any]:
    """
    Executes a lightweight diagnostic ping against MongoDB Atlas.
    Returns a safe diagnostic dictionary without exposing credentials or internal traces.
    """
    settings = get_settings()

    if not settings.MONGODB_URI:
        return {
            "status": "unconfigured",
            "message": "MONGODB_URI environment variable is not set.",
            "database": settings.MONGODB_DATABASE
        }

    try:
        client = get_mongo_client()
        if client is None:
            return {
                "status": "disconnected",
                "message": "Unable to establish connection to MongoDB Atlas.",
                "database": settings.MONGODB_DATABASE
            }
        
        # Ping admin database
        client.admin.command("ping")
        return {
            "status": "connected",
            "message": "MongoDB Atlas connection is healthy and responsive.",
            "database": settings.MONGODB_DATABASE
        }
    except Exception as err:
        logger.warning("MongoDB ping failed: %s", type(err).__name__)
        return {
            "status": "disconnected",
            "message": "Database ping failed. MongoDB Atlas is currently unreachable.",
            "database": settings.MONGODB_DATABASE
        }


def close_mongo_connection() -> None:
    """Closes the MongoDB connection client cleanly during shutdown."""
    global _mongo_client
    if _mongo_client is not None:
        try:
            _mongo_client.close()
            logger.info("MongoDB client connection closed cleanly.")
        except Exception as err:
            logger.warning("Error closing MongoDB client: %s", err)
        finally:
            _mongo_client = None
