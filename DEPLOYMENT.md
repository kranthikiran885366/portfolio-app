# Deployment Guide

## Complete Full-Stack Portfolio Application

### 🚀 Features Implemented
- **Authentication System** - JWT-based login/signup
- **Real-time Features** - Socket.IO notifications
- **Project Management** - CRUD operations with likes/views
- **Skills Management** - Proficiency tracking
- **Blog System** - Content management with comments
- **Course Platform** - Learning management system
- **Portfolio Customization** - Themes and layouts
- **Modern UI/UX** - Responsive design with animations

### 📁 Project Structure
```
portfolio-app/
├── backend/                 # Express.js API
│   ├── models/             # 8 MongoDB models
│   ├── controllers/        # 7 controllers
│   ├── routes/            # 8 route files
│   ├── middleware/        # Auth, validation, error handling
│   └── server.js          # Socket.IO server
├── src/                   # React frontend
│   ├── pages/            # Enhanced UI pages
│   ├── services/         # API integration
│   ├── hooks/           # Custom hooks + Socket.IO
│   └── context/         # Authentication context
└── deployment files
```

## 🔧 Local Development

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI
npm run dev
```

### Frontend Setup
```bash
npm install
cp .env.example .env
# Update .env with backend URL
npm run dev
```

## 🌐 Render Deployment

### Method 1: Using render.yaml (Recommended)
1. Push code to GitHub
2. Connect Render to your GitHub repo
3. Render will auto-detect render.yaml and deploy both services

### Method 2: Manual Setup

#### Backend Deployment
1. Create new Web Service on Render
2. Connect GitHub repository
3. Settings:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**:
     ```
     NODE_ENV=production
     JWT_SECRET=[generate secure key]
     MONGODB_URI=[your MongoDB Atlas URI]
     FRONTEND_URL=https://your-frontend-url.onrender.com
     ```

#### Frontend Deployment
1. Create new Static Site on Render
2. Connect same GitHub repository
3. Settings:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     ```

## 🗄️ Database Setup

### MongoDB Atlas
1. Create account at mongodb.com/atlas
2. Create new cluster
3. Get connection string
4. Add to MONGODB_URI in environment variables

## 🔐 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.onrender.com
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.onrender.com/api
```

## 🚀 Quick Deploy Commands

### GitHub Setup (if authentication works)
```bash
git init
git add .
git commit -m "Complete portfolio application"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

### Alternative: Create New Repository
1. Go to GitHub.com
2. Create new repository
3. Upload files manually or use GitHub CLI

## 📋 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Core Features
- `/api/projects/*` - Project management
- `/api/skills/*` - Skills management
- `/api/blogs/*` - Blog system
- `/api/courses/*` - Learning platform
- `/api/portfolios/*` - Portfolio customization
- `/api/notifications/*` - Real-time notifications

## 🔧 Troubleshooting

### Common Issues
1. **MongoDB Connection**: Ensure IP whitelist includes 0.0.0.0/0 for Render
2. **CORS Errors**: Check FRONTEND_URL matches deployed frontend
3. **Build Failures**: Ensure all dependencies in package.json
4. **Socket.IO**: May need WebSocket support (Render supports this)

### Local Testing
```bash
# Test backend
curl http://localhost:5000/api/health

# Test frontend
npm run dev
```

## 📱 Features Overview

### Real-time Features
- Live notifications
- Real-time project views
- Socket.IO integration

### Security
- JWT authentication
- Password hashing
- Rate limiting
- Input validation
- CORS protection

### Performance
- Database indexing
- Pagination
- Caching
- Optimized queries

## 🎨 UI/UX Features
- Modern design system
- Responsive layout
- Loading states
- Error handling
- Smooth animations
- Dark/light themes

The application is production-ready with comprehensive error handling, security measures, and scalable architecture!