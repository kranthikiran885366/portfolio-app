# Portfolio Application - Full Stack

A complete full-stack portfolio application with React frontend and Node.js/Express backend with MongoDB integration.

## Project Structure

\`\`\`
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── services/        # API service layer
│   │   ├── context/         # React context (Auth)
│   │   ├── hooks/           # Custom hooks
│   │   └── App.jsx          # Main app component
│   └── package.json
│
└── backend/                  # Express.js backend
    ├── models/              # MongoDB models (User, Student)
    ├── controllers/         # Route controllers
    ├── routes/              # API routes
    ├── middleware/          # Auth middleware
    ├── server.js            # Express server
    └── package.json
\`\`\`

## Features

### Frontend
- React 18 with Vite
- React Router for navigation
- JWT-based authentication
- Student profile management
- Responsive design
- API integration with backend

### Backend
- Express.js server
- MongoDB database
- JWT authentication
- Student model with comprehensive fields
- User authentication (signup/login)
- RESTful API endpoints
- CORS enabled

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
\`\`\`bash
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create `.env` file:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update `.env` with your MongoDB URI and JWT secret:
\`\`\`
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=5000
NODE_ENV=development
\`\`\`

5. Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
\`\`\`bash
cd ..
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create `.env` file:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update `.env` with backend API URL:
\`\`\`
VITE_API_URL=http://localhost:5000/api
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `GET /api/students/profile/me` - Get current user's profile (protected)
- `PUT /api/students/profile/me` - Update current user's profile (protected)
- `DELETE /api/students/:id` - Delete student (protected)

## Authentication Flow

1. User signs up with email and password
2. Backend creates User and Student records
3. JWT token is generated and returned
4. Token is stored in localStorage
5. Token is sent with each API request in Authorization header
6. Protected routes verify token validity

## Database Models

### User Model
- name (String)
- email (String, unique)
- password (String, hashed)
- role (String: student/admin)
- createdAt (Date)

### Student Model
- userId (Reference to User)
- firstName (String)
- lastName (String)
- email (String, unique)
- phone (String)
- bio (String)
- skills (Array)
- portfolio (String)
- github (String)
- linkedin (String)
- profileImage (String)
- enrolledCourses (Array of References)
- completedCourses (Array of References)
- gpa (Number)
- status (String: active/inactive/graduated)
- createdAt (Date)
- updatedAt (Date)

## Frontend Pages

- **Home** - Landing page
- **Portfolio** - Portfolio showcase
- **Blog/Academy** - Blog and learning content
- **Skills** - Skills showcase
- **Market** - Marketplace with search
- **Login** - User login
- **Signup** - User registration
- **Profile** - Student profile management

## Technologies Used

### Frontend
- React 18
- Vite
- React Router v6
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- CORS

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes
- CORS configuration
- Input validation

## Future Enhancements

- Email verification
- Password reset functionality
- OAuth integration (Google, GitHub)
- Course management system
- Student dashboard with analytics
- Admin panel
- File upload for profile images
- Real-time notifications
- Search and filtering

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or check your Atlas connection string
- Verify MONGODB_URI in .env file

### CORS Error
- Check that backend CORS is properly configured
- Verify VITE_API_URL matches backend URL

### Authentication Issues
- Clear localStorage and try logging in again
- Check JWT_SECRET is consistent between sessions
- Verify token is being sent in Authorization header

## License

MIT License

## Support

For issues or questions, please open an issue in the repository.
