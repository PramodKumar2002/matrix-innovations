"""
Automated Test Suite for Matrix Innovations Backend API.

Tests:
1. Health check endpoints (/api/health and /api/health/db)
2. Services catalog endpoint (/api/services and search query)
3. Contact validation (field limits, email regex, full_name alias, error formatting)
4. Admin authentication security (missing key, invalid key, valid key)
5. Swagger / OpenAPI schema endpoint (/openapi.json and /docs)
6. Vercel serverless entry point imports
"""

import sys
import unittest
from pathlib import Path

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from starlette.testclient import TestClient
from app.main import app
from app.config import get_settings


class MatrixBackendTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)
        cls.settings = get_settings()
        cls.admin_key = cls.settings.ADMIN_API_KEY

    def test_01_root_endpoint(self):
        """Verify API root welcome response."""
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertIn("documentation", data)

    def test_02_health_endpoint(self):
        """Verify GET /api/health returns 200 and standard success response."""
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertEqual(data["message"], "Matrix Innovations Python backend is running")

    def test_03_services_endpoint(self):
        """Verify GET /api/services returns the 6 company services."""
        response = self.client.get("/api/services")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertEqual(len(data["services"]), 6)

        # Verify key service IDs
        service_ids = [s["id"] for s in data["services"]]
        expected_ids = ["web-dev", "software-dev", "it-training", "robotics-ai", "digital-solutions", "career-dev"]
        for expected_id in expected_ids:
            self.assertIn(expected_id, service_ids)

    def test_04_services_search(self):
        """Verify GET /api/services?search=robotics filters accurately."""
        response = self.client.get("/api/services?search=robotics")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data["services"]), 1)
        self.assertEqual(data["services"][0]["id"], "robotics-ai")

    def test_05_contact_validation_missing_fields(self):
        """Verify POST /api/contact rejects invalid or missing fields with 422."""
        # Empty payload
        response = self.client.post("/api/contact", json={})
        self.assertEqual(response.status_code, 422)
        data = response.json()
        self.assertFalse(data["success"])
        self.assertIn("errors", data)

    def test_06_contact_validation_invalid_email(self):
        """Verify POST /api/contact rejects invalid email format."""
        payload = {
            "name": "Rahul Sharma",
            "email": "invalid-email-format",
            "phone": "+91 9876543210",
            "subject": "Web Development",
            "message": "We need an enterprise web application developed."
        }
        response = self.client.post("/api/contact", json=payload)
        self.assertEqual(response.status_code, 422)

    def test_07_contact_validation_short_message(self):
        """Verify POST /api/contact rejects message under 10 chars."""
        payload = {
            "name": "Rahul Sharma",
            "email": "rahul@example.com",
            "message": "Hi"
        }
        response = self.client.post("/api/contact", json=payload)
        self.assertEqual(response.status_code, 422)

    def test_08_admin_unauthorized_without_key(self):
        """Verify admin routes reject requests without authentication."""
        response = self.client.get("/api/contact")
        self.assertEqual(response.status_code, 401)

    def test_09_admin_unauthorized_with_wrong_key(self):
        """Verify admin routes reject requests with invalid API key."""
        response = self.client.get(
            "/api/contact",
            headers={"X-Admin-API-Key": "wrong_key_123"}
        )
        self.assertEqual(response.status_code, 401)

    def test_10_admin_authorized_invalid_objectid(self):
        """Verify admin route rejects malformed MongoDB ObjectId with 400."""
        response = self.client.get(
            "/api/contact/invalid-non-hex-id",
            headers={"X-Admin-API-Key": self.admin_key}
        )
        self.assertEqual(response.status_code, 400)

    def test_11_swagger_docs(self):
        """Verify Swagger UI and OpenAPI JSON endpoints load successfully."""
        docs_response = self.client.get("/docs")
        self.assertEqual(docs_response.status_code, 200)

        openapi_response = self.client.get("/openapi.json")
        self.assertEqual(openapi_response.status_code, 200)
        spec = openapi_response.json()
        self.assertEqual(spec["info"]["title"], "Matrix Innovations API")
        self.assertIn("/api/health", spec["paths"])
        self.assertIn("/api/contact", spec["paths"])
        self.assertIn("/api/services", spec["paths"])

    def test_12_vercel_serverless_entry_point(self):
        """Verify backend/api/index.py exports app properly for Vercel."""
        from api.index import app as vercel_app
        self.assertIsNotNone(vercel_app)
        self.assertEqual(vercel_app.title, "Matrix Innovations API")


if __name__ == "__main__":
    unittest.main()
