# Complete Setup Guide

## Step-by-Step Installation

### 1. Clone or Extract Project

Extract the ZIP file to your desired location.

### 2. Backend Setup

#### Install Backend Dependencies
\`\`\`bash
cd backend
npm install
\`\`\`

#### Configure Environment Variables
Create a `.env` file in the backend directory:

\`\`\`env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/portfolio
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=5000
NODE_ENV=development
\`\`\`

#### Start Backend Server
\`\`\`bash
npm run dev
\`\`\`

You should see:
\`\`\`
MongoDB connected
Server running on port 5000
\`\`\`

### 3. Frontend Setup

#### Install Frontend Dependencies
\`\`\`bash
cd ..
npm install
\`\`\`

#### Configure Environment Variables
Create a `.env` file in the root directory:

\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

#### Start Frontend Server
\`\`\`bash
npm run dev
\`\`\`

You should see:
\`\`\`
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:3000/
\`\`\`

### 4. Test the Application

1. Open browser to `http://localhost:3000`
2. Click "Sign Up" to create a new account
3. Fill in the registration form
4. You'll be redirected to home page (logged in)
5. Click on your name in navbar to view your profile
6. Edit your profile with skills, links, etc.

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   - **Windows**: `mongod`
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

### Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get connection string
5. Update MONGODB_URI in backend `.env`:
   \`\`\`
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   \`\`\`

## API Testing

### Using cURL

#### Signup
\`\`\`bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
\`\`\`

#### Login
\`\`\`bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
\`\`\`

#### Get Profile (with token)
\`\`\`bash
curl -X GET http://localhost:5000/api/students/profile/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
\`\`\`

### Using Postman

1. Import the API endpoints
2. Set up environment variable for token
3. Test each endpoint

## Troubleshooting

### Port Already in Use

If port 5000 or 3000 is already in use:

**Backend (change port):**
\`\`\`env
PORT=5001
\`\`\`

**Frontend (change port in vite.config.js):**
\`\`\`javascript
server: {
  port: 3001,
}
\`\`\`

### MongoDB Connection Failed

1. Check MongoDB is running
2. Verify connection string in `.env`
3. Check firewall settings
4. For Atlas, whitelist your IP

### CORS Error

1. Ensure backend is running
2. Check VITE_API_URL matches backend URL
3. Verify CORS is enabled in backend

### Token Expired

1. Clear localStorage: `localStorage.clear()`
2. Log out and log back in
3. Get new token

## Production Deployment

### Backend Deployment (Heroku/Railway)

1. Set environment variables on platform
2. Deploy backend code
3. Update VITE_API_URL to production backend URL

### Frontend Deployment (Vercel/Netlify)

1. Build frontend: `npm run build`
2. Deploy `dist` folder
3. Set environment variables on platform

## Next Steps

1. Customize the UI/styling
2. Add more features (courses, projects, etc.)
3. Implement email verification
4. Add admin dashboard
5. Deploy to production

## Support

For issues, check:
- Backend console for errors
- Browser console for frontend errors
- MongoDB connection status
- Environment variables are set correctly
