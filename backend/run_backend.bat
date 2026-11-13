@echo off
echo ========================================================
echo Starting Matrix Innovations FastAPI Backend (Port 8000)
echo ========================================================
cd /d "%~dp0"
.\venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
pause
