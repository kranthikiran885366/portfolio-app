#!/bin/bash

# Start both backend and frontend
echo "Starting Portfolio Application..."
echo "=================================="
echo ""

# Start backend in background
echo "Starting backend server..."
cd backend
npm install > /dev/null 2>&1
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "Starting frontend server..."
cd ..
npm install > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!

echo ""
echo "=================================="
echo "Application Started!"
echo "=================================="
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
