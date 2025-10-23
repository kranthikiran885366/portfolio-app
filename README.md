# 🚀 Portfolio Builder - Full Stack Application

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://portfolio-app-kappa-red.vercel.app/)
[![Backend API](https://img.shields.io/badge/API-Live-blue)](https://portfolio-app-1-iv35.onrender.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)

> A modern, full-stack portfolio application that empowers developers, designers, and creators to build stunning portfolios in minutes.

## ✨ Features

### 🎨 Frontend
- **Modern React 18** with Vite for lightning-fast development
- **Responsive Design** that looks great on all devices
- **Real-time Notifications** with Socket.IO integration
- **JWT Authentication** with secure token management
- **Interactive Portfolio Showcase** with filtering and search
- **Skills Management** with visual progress indicators
- **Course & Blog Platform** for learning and sharing
- **Beautiful UI/UX** with smooth animations and transitions

### ⚡ Backend
- **Express.js** RESTful API with comprehensive endpoints
- **MongoDB Atlas** cloud database with Mongoose ODM
- **JWT Authentication** with bcrypt password hashing
- **Real-time Features** using Socket.IO
- **Security Middleware** (Helmet, CORS, Rate Limiting)
- **Input Validation** and error handling
- **Scalable Architecture** with modular design

### 🔐 Security
- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes with middleware
- CORS configuration for cross-origin requests
- Rate limiting to prevent abuse
- Input validation and sanitization

## 🌐 Live Demo

- **Frontend**: [https://portfolio-app-kappa-red.vercel.app/](https://portfolio-app-kappa-red.vercel.app/)
- **Backend API**: [https://portfolio-app-1-iv35.onrender.com/](https://portfolio-app-1-iv35.onrender.com/)

## 📸 Screenshots

### Landing Page
![Landing Page](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop)

### Portfolio Showcase
![Portfolio](https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=400&fit=crop)

### Dashboard
![Dashboard](https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop)

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/kranthikiran885366/portfolio-app.git
cd portfolio-app
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI and JWT secret
npm run dev
```

3. **Frontend Setup**
```bash
cd ..
npm install
cp .env.example .env
# Update .env with backend API URL
npm run dev
```

4. **Seed Database (Optional)**
```bash
cd backend
npm run seed-projects
```

## 🔧 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📁 Project Structure

```
portfolio-app/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── context/         # React context (Auth)
│   │   ├── hooks/           # Custom React hooks
│   │   └── App.jsx          # Main app component
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/                  # Express.js backend
│   ├── models/              # MongoDB models
│   ├── controllers/         # Route controllers
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── server.js            # Express server
│   └── package.json
│
├── docs/                    # Documentation
├── .github/                 # GitHub workflows
└── README.md
```

## 🛠 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill (protected)
- `PUT /api/skills/:id` - Update skill (protected)
- `DELETE /api/skills/:id` - Delete skill (protected)

### Students
- `GET /api/students/profile/me` - Get user profile (protected)
- `PUT /api/students/profile/me` - Update profile (protected)

[View complete API documentation](./docs/API.md)

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/admin),
  createdAt: Date
}
```

### Project Model
```javascript
{
  title: String,
  description: String,
  image: String,
  liveUrl: String,
  githubUrl: String,
  technologies: [String],
  category: String,
  featured: Boolean,
  userId: ObjectId (ref: User)
}
```

[View complete schema documentation](./docs/DATABASE.md)

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render)
1. Connect GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy automatically on push to main branch

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Configure network access and database user
3. Use connection string in backend environment

[View detailed deployment guide](./docs/DEPLOYMENT.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👥 Authors

- **Kiran Kumar** - *Initial work* - [@kranthikiran885366](https://github.com/kranthikiran885366)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Vercel](https://vercel.com/) - Frontend hosting
- [Render](https://render.com/) - Backend hosting
- [Unsplash](https://unsplash.com/) - Beautiful images

## 📊 Project Stats

- **Total Files**: 80+
- **Lines of Code**: 15,000+
- **Components**: 25+
- **API Endpoints**: 30+
- **Database Models**: 8

## 🔮 Future Enhancements

- [ ] Email verification system
- [ ] OAuth integration (Google, GitHub)
- [ ] Advanced analytics dashboard
- [ ] File upload for images
- [ ] Real-time collaboration
- [ ] Mobile app (React Native)
- [ ] AI-powered portfolio suggestions
- [ ] Integration with job boards

## 📞 Support

If you have any questions or need help, please:

1. Check the [documentation](./docs/)
2. Search [existing issues](https://github.com/kranthikiran885366/portfolio-app/issues)
3. Create a [new issue](https://github.com/kranthikiran885366/portfolio-app/issues/new)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/kranthikiran885366">Kiran Kumar</a></p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>