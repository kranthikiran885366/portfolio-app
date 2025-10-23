@echo off
REM Frontend startup script for Windows

echo Starting Portfolio Frontend...
echo ================================

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Check if .env exists
if not exist ".env" (
    echo Creating .env file from template...
    copy .env.example .env
    echo Frontend .env created with default API URL
)

echo Starting frontend server...
call npm run dev
pause
