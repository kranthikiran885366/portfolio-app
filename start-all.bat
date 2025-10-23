@echo off
REM Start both backend and frontend for Windows

echo Starting Portfolio Application...
echo ==================================
echo.

REM Start backend in new window
echo Starting backend server...
cd backend
call npm install > nul 2>&1
start "Portfolio Backend" cmd /k npm run dev

REM Wait a bit for backend to start
timeout /t 3 /nobreak

REM Start frontend in new window
echo Starting frontend server...
cd ..
call npm install > nul 2>&1
start "Portfolio Frontend" cmd /k npm run dev

echo.
echo ==================================
echo Application Started!
echo ==================================
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Close the command windows to stop the servers
echo.
pause
