@echo off
start "Backend" cmd /k "cd /d C:\New_GASU_schedule\backend\service && npx json-server --watch db.json --port 8000"
timeout /t 2 /nobreak >nul
start "Frontend" cmd /k "cd /d C:\New_GASU_schedule\frontend && npm run dev"