# Portfolio Application API Documentation

## Overview
Complete backend API for a full-stack portfolio application with authentication, user management, projects, skills, courses, blogs, and portfolio customization.

## Models

### 1. User Model (`/models/User.js`)
- **Fields**: name, email, password, role, createdAt
- **Features**: Password hashing, email validation, role-based access

### 2. Student Model (`/models/Student.js`)
- **Fields**: userId, firstName, lastName, email, phone, bio, skills, portfolio, github, linkedin, profileImage, enrolledCourses, completedCourses, gpa, status
- **Features**: Profile management, course tracking, social links

### 3. Project Model (`/models/Project.js`)
- **Fields**: title, description, category, technologies, githubUrl, liveUrl, imageUrl, featured, status, userId, likes, views
- **Features**: Project showcase, likes system, view tracking

### 4. Skill Model (`/models/Skill.js`)
- **Fields**: name, category, level, percentage, userId, yearsOfExperience, certifications, projects
- **Features**: Skill management, proficiency tracking, certifications

### 5. Course Model (`/models/Course.js`)
- **Fields**: title, description, instructor, category, level, duration, price, thumbnail, syllabus, prerequisites, learningOutcomes, enrolledStudents, completedStudents, rating, reviews
- **Features**: Course management, enrollment system, reviews and ratings

### 6. Blog Model (`/models/Blog.js`)
- **Fields**: title, slug, content, excerpt, author, category, tags, featuredImage, isPublished, isFeatured, views, likes, comments, readTime, seo
- **Features**: Blog publishing, comments system, SEO optimization

### 7. Portfolio Model (`/models/Portfolio.js`)
- **Fields**: userId, title, tagline, about, theme, layout, contact, resume, customDomain, subdomain, isPublic, views, seo, analytics
- **Features**: Portfolio customization, theme management, custom domains

## API Routes

### Authentication Routes (`/api/auth`)
- `POST /signup` - User registration
- `POST /login` - User login
- `GET /me` - Get current user profile

### Student Routes (`/api/students`)
- `GET /` - Get all students (with search, pagination)
- `GET /search` - Search students
- `GET /profile/me` - Get my profile
- `PUT /profile/me` - Update my profile
- `GET /:id` - Get student by ID
- `DELETE /:id` - Delete student

### Project Routes (`/api/projects`)
- `GET /` - Get all projects (with filters, search, pagination)
- `GET /my` - Get my projects
- `POST /` - Create new project
- `GET /:id` - Get project by ID
- `PUT /:id` - Update project
- `DELETE /:id` - Delete project
- `POST /:id/like` - Like/unlike project

### Skill Routes (`/api/skills`)
- `GET /` - Get all skills (with filters)
- `GET /categories` - Get skill categories
- `GET /my` - Get my skills
- `POST /` - Create new skill
- `PUT /:id` - Update skill
- `DELETE /:id` - Delete skill

### Course Routes (`/api/courses`)
- `GET /` - Get all courses (with filters, search, pagination)
- `GET /my` - Get my courses (enrolled/created/completed)
- `POST /` - Create new course
- `GET /:id` - Get course by ID
- `PUT /:id` - Update course
- `DELETE /:id` - Delete course
- `POST /:id/enroll` - Enroll in course
- `POST /:id/complete` - Mark course as completed
- `POST /:id/review` - Add course review

### Blog Routes (`/api/blogs`)
- `GET /` - Get all blogs (with filters, search, pagination)
- `GET /categories` - Get blog categories
- `GET /tags` - Get blog tags
- `GET /my` - Get my blogs
- `POST /` - Create new blog
- `GET /slug/:slug` - Get blog by slug
- `GET /:id` - Get blog by ID
- `PUT /:id` - Update blog
- `DELETE /:id` - Delete blog
- `POST /:id/like` - Like/unlike blog
- `POST /:id/comments` - Add comment
- `POST /:id/comments/:commentId/replies` - Add reply to comment

### Portfolio Routes (`/api/portfolios`)
- `GET /` - Get all public portfolios
- `GET /my` - Get my portfolio
- `POST /` - Create portfolio
- `PUT /` - Update portfolio
- `DELETE /` - Delete portfolio
- `GET /check-subdomain/:subdomain` - Check subdomain availability
- `PUT /theme` - Update portfolio theme
- `PUT /layout` - Update portfolio layout
- `GET /subdomain/:subdomain` - Get portfolio by subdomain
- `GET /:id` - Get portfolio by ID

## Controllers

### 1. Auth Controller (`/controllers/authController.js`)
- User registration and login
- JWT token generation
- Password validation
- User profile retrieval

### 2. Student Controller (`/controllers/studentController.js`)
- Student profile management
- Search functionality
- Profile updates
- Student listing with pagination

### 3. Project Controller (`/controllers/projectController.js`)
- Project CRUD operations
- Project search and filtering
- Like system
- View tracking

### 4. Skill Controller (`/controllers/skillController.js`)
- Skill management
- Category filtering
- Proficiency tracking

### 5. Course Controller (`/controllers/courseController.js`)
- Course management
- Enrollment system
- Review and rating system
- Progress tracking

### 6. Blog Controller (`/controllers/blogController.js`)
- Blog CRUD operations
- Comment system
- Like functionality
- SEO optimization

### 7. Portfolio Controller (`/controllers/portfolioController.js`)
- Portfolio customization
- Theme management
- Subdomain handling
- Public/private portfolios

## Middleware

### 1. Authentication Middleware (`/middleware/auth.js`)
- JWT token verification
- Role-based access control
- Protected route handling

### 2. Validation Middleware (`/middleware/validation.js`)
- Input validation for all endpoints
- Data sanitization
- Error formatting

### 3. Error Handler Middleware (`/middleware/errorHandler.js`)
- Global error handling
- Custom error responses
- Development/production error formatting

## Security Features

1. **Helmet.js** - Security headers
2. **Rate Limiting** - API rate limiting
3. **CORS** - Cross-origin resource sharing
4. **JWT Authentication** - Secure token-based auth
5. **Password Hashing** - bcrypt password encryption
6. **Input Validation** - express-validator sanitization
7. **Error Handling** - Secure error responses

## Database Features

1. **MongoDB** with Mongoose ODM
2. **Indexing** for performance
3. **Validation** at schema level
4. **Relationships** between models
5. **Pagination** support
6. **Search** functionality
7. **Soft deletes** where applicable

## Frontend Integration

The API is fully integrated with the React frontend through:

1. **API Service Layer** (`/src/services/api.js`)
2. **Authentication Context** (`/src/context/AuthContext.jsx`)
3. **Custom Hooks** (`/src/hooks/useAuth.js`)
4. **Error Handling** with user-friendly messages
5. **Loading States** management
6. **Caching** for performance

## Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Installation & Setup

1. **Backend Setup**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```

2. **Frontend Setup**:
   ```bash
   npm install
   cp .env.example .env
   npm run dev
   ```

## API Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "count": 10,
  "total": 100,
  "page": 1,
  "pages": 10
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description",
  "errors": []
}
```

This comprehensive backend provides all the necessary functionality for a modern portfolio application with user management, content creation, and customization features.