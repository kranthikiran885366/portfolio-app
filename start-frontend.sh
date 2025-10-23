#!/bin/bash

# Frontend startup script
echo "Starting Portfolio Frontend..."
echo "================================"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "Frontend .env created with default API URL"
fi

echo "Starting frontend server..."
npm run dev
