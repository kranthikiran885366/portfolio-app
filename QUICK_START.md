# Quick Start Guide

## For Windows Users

### Option 1: Automatic Setup (Recommended)
1. Double-click `start-all.bat`
2. Wait for both windows to open
3. Open browser to `http://localhost:3000`

### Option 2: Manual Setup
1. Open Command Prompt
2. Run `start-backend.bat` in one window
3. Open another Command Prompt
4. Run `start-frontend.bat` in the other window
5. Open browser to `http://localhost:3000`

## For Mac/Linux Users

### Option 1: Automatic Setup (Recommended)
1. Open Terminal
2. Run: `chmod +x start-all.sh && ./start-all.sh`
3. Open browser to `http://localhost:3000`

### Option 2: Manual Setup
1. Open Terminal
2. Run: `chmod +x start-backend.sh && ./start-backend.sh`
3. Open another Terminal tab
4. Run: `chmod +x start-frontend.sh && ./start-frontend.sh`
5. Open browser to `http://localhost:3000`

## First Time Setup

### 1. Configure Backend
- Edit `backend/.env`
- Set your MongoDB URI
- Set a secure JWT_SECRET

### 2. Configure Frontend
- Edit `.env`
- Verify VITE_API_URL is correct

### 3. Test the App
1. Sign up with a new account
2. Check your profile page
3. Edit your profile information

## Default Credentials (for testing)

After signup, you can use any email/password combination you create.

## Stopping the Servers

- **Windows**: Close the command windows
- **Mac/Linux**: Press `Ctrl+C` in the terminal

## Common Issues

### Port Already in Use
- Change PORT in backend/.env
- Change port in vite.config.js

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in backend/.env

### CORS Error
- Verify backend is running
- Check VITE_API_URL in frontend/.env

## Next Steps

1. Customize the styling
2. Add more features
3. Deploy to production
4. Set up email notifications

For detailed setup, see SETUP_GUIDE.md
