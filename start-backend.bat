@echo off
REM Backend startup script for Windows

echo Starting Portfolio Backend...
echo ================================

cd backend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Check if .env exists
if not exist ".env" (
    echo Creating .env file from template...
    copy .env.example .env
    echo Please update .env with your MongoDB URI and JWT secret
)

echo Starting backend server...
call npm run dev
pause
