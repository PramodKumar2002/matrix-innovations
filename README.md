# Matrix Innovations - Full-Stack Website & API

Matrix Innovations is a technology engineering and education firm based in Lucknow, India. This repository contains the complete full-stack project:
- **Frontend**: React 19, Vite, Lucide Icons, Vanilla CSS with custom glassmorphism and responsive design.
- **Backend**: Python 3.11+, FastAPI, Pydantic v2, PyMongo, MongoDB Atlas, and Uvicorn.
- **Deployment**: Serverless-ready on Vercel.

---

## 1. Project Directory Structure

```text
matrix/
├── src/                        # React Frontend Source (Untouched & Preserved)
│   ├── assets/                 # Images, logos, and media
│   ├── components/             # Reusable UI components (Navbar, Footer, Modals)
│   ├── sections/               # Page sections (Hero, About, Services, WhyChooseUs, Contact)
│   ├── App.jsx                 # Main layout & section orchestration
│   ├── index.css               # Design tokens, variables & glassmorphic utility classes
│   └── main.jsx                # React DOM root entry
├── public/                     # Static frontend assets
├── package.json                # Frontend npm configuration & build scripts
├── vite.config.js              # Vite bundler configuration
├── index.html                  # Frontend HTML entry point
├── .env.example                # Frontend environment template (VITE_API_BASE_URL)
│
├── backend/                    # Complete Python Backend Service
│   ├── api/
│   │   └── index.py            # Vercel Serverless Function entry point
│   ├── app/
│   │   ├── __init__.py         # App package initialization
│   │   ├── main.py             # FastAPI app setup, CORS, and error handlers
│   │   ├── config.py           # Settings & .env loader using Pydantic BaseSettings
│   │   ├── database.py         # MongoDB Atlas client singleton with ping check
│   │   ├── schemas.py          # Pydantic request and response schemas
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── health.py       # GET /api/health & GET /api/health/db
│   │   │   ├── contact.py      # POST /api/contact & Admin message management
│   │   │   └── services.py     # GET /api/services catalog
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── security.py     # Admin auth, IP rate limiting & input sanitization
│   ├── requirements.txt        # Backend Python dependencies
│   ├── .env.example            # Backend environment template
│   ├── .gitignore              # Ignores venv/, .env, and bytecode
│   ├── test_backend.py         # Automated test suite (12 tests)
│   └── README.md               # Detailed backend documentation
│
├── vercel.json                 # Vercel deployment & rewrite configuration
├── .gitignore                  # Root Git ignore rules
└── README.md                   # Complete full-stack guide & concepts
```

---

## 2. Architecture & Data Flow

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. USER INTERACTION IN BROWSER                                              │
│ User fills out the Contact Us form at http://localhost:5173/                │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTP POST { name, email, phone, message }
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. REACT FRONTEND (src/sections/Contact.jsx)                                │
│ Validates fields in React state -> Shows loading spinner -> Sends fetch()   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ JSON Request across CORS boundary
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 3. FASTAPI APPLICATION (backend/app/main.py)                                │
│ Evaluates CORS origin -> Dispatches to /api/contact router                  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 4. SECURITY & VALIDATION (backend/app/schemas.py & utils/security.py)       │
│ - Checks IP rate limiter (anti-spam protection)                             │
│ - Validates email format, phone format, and string lengths via Pydantic     │
│ - Strips HTML tags to prevent cross-site scripting (XSS)                    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Validated Python dictionary
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 5. DATABASE PERSISTENCE (backend/app/database.py)                           │
│ Singleton PyMongo client inserts document into collection 'contact_messages'│
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Insert acknowledgment & Generated ObjectId
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 6. MONGODB ATLAS CLOUD                                                      │
│ Document stored persistently in encrypted cloud database                    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Success response
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 7. FASTAPI JSON RESPONSE                                                    │
│ HTTP 201 Created: { "success": true, "message": "...", "message_id": "..." }│
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 8. REACT UI FEEDBACK                                                        │
│ Form resets -> Displays emerald success banner -> Hides spinner             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Local Development Commands (Windows PowerShell)

Open PowerShell and follow these exact steps to run both servers simultaneously.

### Terminal 1: Start the Python Backend

```powershell
# 1. Navigate to the backend directory
cd c:\Users\Pc\OneDrive\Desktop\matrix\backend

# 2. Allow script execution in current PowerShell session (if restricted)
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# 3. Create a Python virtual environment (if not already created)
python -m venv venv

# 4. Activate the virtual environment
.\venv\Scripts\Activate.ps1

# 5. Install required dependencies
pip install -r requirements.txt

# 6. Create your local .env configuration file
Copy-Item .env.example .env

# 7. Start the FastAPI development server with live reload
uvicorn app.main:app --reload --port 8000
```

> **Backend is now live at:** `http://127.0.0.1:8000`  
> **Interactive Swagger Documentation:** `http://127.0.0.1:8000/docs`  
> **Health Check Endpoint:** `http://127.0.0.1:8000/api/health`  
> **To stop the backend:** Press `Ctrl + C` in the PowerShell window.

---

### Terminal 2: Start the React Frontend

Open a **second** PowerShell window:

```powershell
# 1. Navigate to the project root
cd c:\Users\Pc\OneDrive\Desktop\matrix

# 2. Create the frontend .env configuration file (if not already created)
Copy-Item .env.example .env

# 3. Install npm packages (if not already installed)
npm install

# 4. Start the Vite React development server
npm run dev
```

> **Frontend is now live at:** `http://localhost:5173`  
> **To stop the frontend:** Press `Ctrl + C` in the PowerShell window.

---

### Terminal 3: Run the Automated Backend Tests

To verify that all backend endpoints, validation rules, and security checks are functioning correctly:

```powershell
cd c:\Users\Pc\OneDrive\Desktop\matrix\backend
.\venv\Scripts\Activate.ps1
python test_backend.py
```

Expected output:
```text
Ran 12 tests in 0.15s
OK
```

---

## 4. API Endpoints Reference

### Public Endpoints

| Method | Endpoint | Description | Sample Request |
|---|---|---|---|
| `GET` | `/` | API Root & Links | None |
| `GET` | `/api/health` | Health & Version Check | None |
| `GET` | `/api/health/db` | Database Status Check | None |
| `GET` | `/api/services` | List Matrix Services | Optional: `?search=robotics` |
| `POST` | `/api/contact` | Submit Contact Form | See JSON payload below |
| `GET` | `/docs` | Interactive Swagger UI | Browser viewable |
| `GET` | `/openapi.json` | OpenAPI 3.1 JSON Schema | None |

#### Sample Contact Submission Payload (`POST /api/contact`)
```json
{
  "name": "Amit Verma",
  "email": "amit.verma@example.com",
  "phone": "+91 98765 43210",
  "subject": "Web Development",
  "message": "We would like to discuss building an enterprise customer dashboard using React and FastAPI."
}
```

#### Sample Response (`HTTP 201 Created`)
```json
{
  "success": true,
  "message": "Your message has been submitted successfully.",
  "message_id": "67324869c9b4e7235a8f43d1"
}
```

---

### Protected Administrative Endpoints

To view, inspect, or delete contact submissions, pass your secret `ADMIN_API_KEY`:

- **Header Option 1:** `X-Admin-API-Key: <ADMIN_API_KEY>`
- **Header Option 2:** `Authorization: Bearer <ADMIN_API_KEY>`

| Method | Endpoint | Description | Parameters |
|---|---|---|---|
| `GET` | `/api/contact` | List messages (paginated) | `?page=1&limit=10` |
| `GET` | `/api/contact/{id}` | Retrieve single message | Path parameter: MongoDB ObjectId |
| `DELETE` | `/api/contact/{id}` | Delete message | Path parameter: MongoDB ObjectId |

#### Test Admin Endpoint via PowerShell:
```powershell
$headers = @{ "X-Admin-API-Key" = "test_admin_matrix_secret_key_98765" }
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/contact?page=1&limit=5" -Headers $headers -Method GET
```

---

## 5. Teaching & Core Concepts

### 1. Python vs. FastAPI
- **Python**: The core general-purpose programming language that provides the syntax, data structures, and standard libraries.
- **FastAPI**: A high-performance web framework built *on top of* Python. It provides HTTP routing, request parsing, dependency injection, and automatic OpenAPI documentation generation.

### 2. API Endpoints vs. Routes
- **Route**: The code structure and URL path defined in your application (e.g. `@router.post("/api/contact")` in `contact.py`).
- **Endpoint**: The public URL that external clients call over the internet to access that route (e.g. `https://matrixinnovations.in/api/contact`).

### 3. GET vs. POST
- **GET**: Used to *read or retrieve* information. Data is passed in URL query parameters. GET requests should be idempotent (calling them multiple times has no side effects). Example: `GET /api/services`.
- **POST**: Used to *send or submit* data to the server to create a resource or trigger an action. Data is transmitted securely inside the request body (payload). Example: `POST /api/contact`.

### 4. Request vs. Response
- **Request**: The message sent by the client (browser/React) to the server. Contains HTTP method, URL path, headers, query parameters, and optional JSON body.
- **Response**: The message sent back by the server to the client. Contains an HTTP status code (e.g. 200, 201, 400, 404, 500), response headers, and the JSON payload.

### 5. Pydantic Schemas vs. MongoDB Documents
- **Pydantic Schema**: A Python class that validates and normalizes *in-flight* data at the API boundary before code touches it. It rejects invalid types and formats.
- **MongoDB Document**: A JSON-like BSON object stored *at rest* inside the database collection. It has a unique `_id` field and persists data to disk.

### 6. CORS vs. Authentication
- **CORS (Cross-Origin Resource Sharing)**: A browser security mechanism that determines whether a frontend running at `http://localhost:5173` is permitted to make fetch requests to a backend at `http://localhost:8000`. CORS prevents unauthorized websites from reading your API responses.
- **Authentication**: Verifies *who* is making the request (e.g. verifying an `ADMIN_API_KEY` to ensure only company administrators can view contact messages).

### 7. Local Development vs. Serverless Deployment
- **Local Development (Uvicorn)**: A long-running server process that continuously listens on a local port (e.g. `8000`). It maintains active memory state and connection pools indefinitely.
- **Serverless Deployment (Vercel)**: Code is packaged into stateless functions. Instances spin up on-demand to handle incoming requests ("cold start"), process them, and eventually spin down. Singletons and global connections are reused across "warm" invocations.

---

## 6. Vercel Deployment Guide

You can deploy Matrix Innovations on Vercel using either of two recommended patterns:

### Option A: Unified Full-Stack Deployment (Single Vercel Project)
With the included `vercel.json`, Vercel builds the React frontend with Vite and exposes the Python backend as serverless functions.

1. Push your repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/), click **Add New** → **Project** and import your repository.
3. Configure **Environment Variables** in Vercel:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `MONGODB_DATABASE`: `matrix_innovations`
   - `ADMIN_API_KEY`: A strong secret key.
   - `ALLOWED_ORIGINS`: Your Vercel deployment URL (e.g., `https://matrix-innovations.vercel.app`).
4. Click **Deploy**.
5. Vercel automatically builds Vite into `dist` and routes `/api/*` requests to `backend/api/index.py`.

---

### Option B: Decoupled Deployments (Recommended for Clean CI/CD)
Deploying frontend and backend as separate projects provides independent builds, isolated logs, and maximum reliability:

1. **Backend Project**:
   - In Vercel, import the repository and set **Root Directory** to `backend`.
   - Set **Framework Preset** to `Other`.
   - Add environment variables: `MONGODB_URI`, `MONGODB_DATABASE`, `ADMIN_API_KEY`, `ALLOWED_ORIGINS`.
   - Deploy. You will receive a URL such as `https://matrix-backend.vercel.app`.
2. **Frontend Project**:
   - In Vercel, import the repository and set **Root Directory** to `./` (root).
   - Set **Framework Preset** to `Vite`.
   - Set Environment Variable:
     `VITE_API_BASE_URL=https://matrix-backend.vercel.app`
   - Deploy.
   - In the Backend Project's `ALLOWED_ORIGINS`, add the Frontend Project URL so CORS requests are accepted!

---

## 7. Common Technical Interview Questions

**Q1: Why did you use FastAPI over Flask or Django for this backend?**  
> *Answer:* FastAPI provides native asynchronous support (ASGI), automatic data validation using Pydantic, built-in interactive Swagger documentation, and high performance comparable to Node.js and Go. It is lightweight, modern, and fits serverless architectures like Vercel with zero boilerplate.

**Q2: What is the purpose of CORS and why is it needed here?**  
> *Answer:* By default, web browsers enforce the Same-Origin Policy, preventing JavaScript on one origin (port 5173) from fetching data from another origin (port 8000). CORS headers configured in FastAPI explicitly grant permission to the React frontend to communicate with the backend.

**Q3: How do you handle database connections in a serverless environment like Vercel?**  
> *Answer:* Serverless functions can spawn multiple short-lived instances. We use a singleton pattern with a cached `MongoClient` instance at the module level. This allows warm serverless function instances to reuse existing connection pools rather than opening a new TCP handshake for every single request, while using short timeouts (5000ms) to prevent requests from hanging if the cluster is unreachable.

**Q4: How does Pydantic protect the backend from bad data?**  
> *Answer:* Pydantic enforces strict type annotations and validation rules before the route handler executes. It validates email formats, strips excessive whitespace, checks character minimums and maximums, and converts malformed requests into standardized HTTP 422 errors, preventing invalid data from ever reaching the database.

**Q5: Why shouldn't database credentials or admin keys be stored in React frontend code?**  
> *Answer:* React frontend code is compiled into static JavaScript files that are delivered directly to the user's browser. Anyone can open DevTools or view the source code to inspect embedded keys. Secrets must live strictly on the server in environment variables.

---

## 8. Troubleshooting & FAQ

- **Error: "Unable to save your message right now" (503 Service Unavailable)**:
  - *Cause:* `MONGODB_URI` is not set or your MongoDB Atlas IP Access List does not allow connections from your current IP.
  - *Fix:* Ensure `backend/.env` contains a valid `MONGODB_URI`, and in MongoDB Atlas, set **Network Access** to `0.0.0.0/0`.
- **CORS error in browser console (`Access-Control-Allow-Origin`)**:
  - *Cause:* The frontend URL is not in `ALLOWED_ORIGINS`.
  - *Fix:* In `backend/.env`, verify `ALLOWED_ORIGINS` includes your exact frontend origin (e.g. `http://localhost:5173`).
- **PowerShell says "Execution of scripts is disabled on this system"**:
  - *Fix:* Run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` in your PowerShell window.
- **Port 8000 already in use**:
  - *Fix:* Start Uvicorn on another port with `uvicorn app.main:app --reload --port 8001`, and update `VITE_API_BASE_URL` in the frontend `.env`.
