#!/bin/bash

# Backend startup script
echo "Starting Portfolio Backend..."
echo "================================"

cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "Please update .env with your MongoDB URI and JWT secret"
fi

echo "Starting backend server..."
npm run dev
