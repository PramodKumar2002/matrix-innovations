@echo off
echo ========================================================
echo  Matrix Innovations - Fullstack Dev Server Starter
echo ========================================================
echo Starting FastAPI Backend (Port 8000)...
start "Matrix Backend (FastAPI)" cmd /k "cd /d %~dp0backend && .\venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"

echo Starting React Vite Frontend (Port 5173)...
start "Matrix Frontend (Vite)" cmd /k "cd /d %~dp0 && npm run dev"

echo Both services launched!
echo Backend:  http://127.0.0.1:8000
echo Swagger:  http://127.0.0.1:8000/docs
echo Frontend: http://localhost:5173
pause
