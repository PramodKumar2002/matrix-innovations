# Matrix Innovations - Backend API Documentation

Welcome to the **Matrix Innovations** backend repository! This service is built with **Python 3.11+**, **FastAPI**, **Pydantic v2**, and **MongoDB Atlas**, optimized for local development with **Uvicorn** and serverless deployment on **Vercel**.

---

## 1. Architecture & Request Flow

```text
React Frontend (Vite)
      │
      │ HTTP Request (e.g. POST /api/contact)
      ▼
FastAPI Application (app/main.py)
      │
      ├── CORS Middleware (Validates allowed origins)
      ├── Rate Limiter (app/utils/security.py - checks client IP)
      │
      ▼
Router Dispatcher (app/routers/contact.py)
      │
      ├── Pydantic Schema Validation (app/schemas.py)
      ├── Text Sanitization (app/utils/security.py - prevents XSS)
      │
      ▼
MongoDB Atlas Connection Pool (app/database.py)
      │
      │ PyMongo insert_one() into 'contact_messages'
      ▼
MongoDB Atlas Cloud Database (Persistent Storage)
      │
      │ BSON acknowledgment
      ▼
JSON Response (FastAPI transforms to JSON)
      │
      ▼
React UI Notification (Displays success or error message)
```

---

## 2. Directory Structure & File Breakdown

```text
backend/
├── api/
│   └── index.py            # Vercel serverless function entry point
├── app/
│   ├── __init__.py         # Package initialization
│   ├── main.py             # FastAPI instance, CORS, middleware, global error handlers
│   ├── config.py           # Environment settings loader using Pydantic BaseSettings
│   ├── database.py         # PyMongo singleton connection, connection pool & Atlas ping
│   ├── schemas.py          # Pydantic request validation and response models
│   ├── routers/
│   │   ├── __init__.py     # Router package initialization
│   │   ├── health.py       # GET /api/health and GET /api/health/db
│   │   ├── contact.py      # Public POST /api/contact & Admin GET/DELETE /api/contact
│   │   └── services.py     # GET /api/services (Matrix Innovations catalog)
│   └── utils/
│       ├── __init__.py     # Utilities package initialization
│       └── security.py     # Admin API key auth, rate limiting & XSS input sanitization
├── requirements.txt        # Production & runtime dependencies
├── .env.example            # Sample configuration with safe placeholders
├── .gitignore              # Ignores .env, venv/, and cache files
├── test_backend.py         # Automated test suite (12 unit & integration tests)
└── README.md               # Backend documentation
```

### Detailed File Guide

| File | Primary Technology | Purpose & Why It Exists |
|---|---|---|
| `app/config.py` | `pydantic-settings` | Loads environment variables from `.env` locally or process environment in Vercel. Validates and caches settings. |
| `app/database.py` | `pymongo` | Creates a singleton `MongoClient` connection with safe timeouts. Reuses connection across warm serverless requests. |
| `app/schemas.py` | `pydantic` | Defines data shapes and validation rules (e.g. email regex, min/max length, full name alias). |
| `app/utils/security.py` | `secrets`, `fastapi.security` | Secures admin endpoints via constant-time token comparison (`secrets.compare_digest`), limits spam via IP rate limiter, and cleans inputs. |
| `app/routers/health.py` | `fastapi` | Provides `/api/health` for uptime checks and `/api/health/db` for database connectivity verification. |
| `app/routers/contact.py` | `fastapi`, `pymongo`, `bson` | Manages contact submissions and admin retrieval/deletion of inquiries. |
| `app/routers/services.py` | `fastapi` | Serves the 6 company services with descriptions and tech stacks. |
| `app/main.py` | `fastapi`, `starlette` | Assembles all routers, applies CORS, and catches exceptions so internal server errors never leak secrets. |
| `api/index.py` | `fastapi` | Entry point required by Vercel's Python Serverless runtime. |

---

## 3. MongoDB Atlas Setup Guide

To store contact submissions persistently in MongoDB Atlas:

1. **Sign Up / Log In**: Visit [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free account.
2. **Create a Free Cluster**:
   - Choose **M0 Free** tier.
   - Select your preferred cloud provider and region (e.g., AWS Mumbai / ap-south-1).
3. **Create Database User**:
   - In Atlas, navigate to **Security** → **Database Access**.
   - Click **Add New Database User**.
   - Authentication Method: **Password**.
   - Role: **Read and write to any database**.
   - Save the username and password safely.
4. **Configure Network Access**:
   - Navigate to **Security** → **Network Access**.
   - Click **Add IP Address**.
   - Select **Allow Access from Anywhere** (`0.0.0.0/0`).
   - *Why?* Vercel serverless functions run across dynamic IP pools, so access from anywhere with user/password authentication is required.
5. **Obtain Connection String**:
   - In **Database** → **Clusters**, click **Connect**.
   - Select **Drivers** → Python (Version 3.11 or later).
   - Copy the URI:
     `mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority`
   - Paste it into your `backend/.env` file under `MONGODB_URI`.

---

## 4. API Endpoints Reference

### Public Endpoints

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `GET` | `/` | API Information & Links | None |
| `GET` | `/api/health` | Backend Liveness Check | None |
| `GET` | `/api/health/db` | Database Connectivity Check | None |
| `GET` | `/api/services` | List Company Services | Optional query: `?search=web` |
| `POST` | `/api/contact` | Submit Contact Form | JSON `{ name, email, phone, subject, message }` |
| `GET` | `/docs` | Interactive Swagger UI | None |
| `GET` | `/openapi.json` | OpenAPI 3.1 Specification | None |

### Protected Administrative Endpoints

> **Authentication Required:** Pass header `X-Admin-API-Key: <YOUR_ADMIN_API_KEY>` or `Authorization: Bearer <YOUR_ADMIN_API_KEY>`.

| Method | Endpoint | Description | Query Parameters |
|---|---|---|---|
| `GET` | `/api/contact` | List Submitted Messages | `?page=1&limit=10&status_filter=new` |
| `GET` | `/api/contact/{message_id}` | Get Specific Message | Path parameter: MongoDB ObjectId |
| `DELETE` | `/api/contact/{message_id}` | Delete Message | Path parameter: MongoDB ObjectId |

---

## 5. Local Development Commands (PowerShell)

### Step 1: Navigate to backend folder
```powershell
cd c:\Users\Pc\OneDrive\Desktop\matrix\backend
```

### Step 2: Create virtual environment
```powershell
python -m venv venv
```

### Step 3: Activate virtual environment
```powershell
.\venv\Scripts\Activate.ps1
```
*(If you see execution policy error, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` first)*

### Step 4: Install dependencies
```powershell
pip install -r requirements.txt
```

### Step 5: Configure `.env`
```powershell
Copy-Item .env.example .env
# Open .env and add your MONGODB_URI and ADMIN_API_KEY
```

### Step 6: Start local server
```powershell
uvicorn app.main:app --reload --port 8000
```

### Step 7: Test endpoints
- Open Swagger Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- Test Health: [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)
- Run Automated Tests:
  ```powershell
  python test_backend.py
  ```
