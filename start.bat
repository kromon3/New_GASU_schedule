@echo off
start "Backend" cmd /k "cd /d C:\New_GASU_schedule\backend && npm run dev"
timeout /t 2 /nobreak >nul
start "Frontend" cmd /k "cd /d C:\New_GASU_schedule\frontend && npm run dev"