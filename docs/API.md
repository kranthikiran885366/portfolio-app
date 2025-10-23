# API Documentation

## Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://portfolio-app-1-iv35.onrender.com/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication

#### POST /auth/signup
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

#### POST /auth/login
Login an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

#### GET /auth/me
Get current user information (Protected).

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### Projects

#### GET /projects
Get all projects with pagination and filtering.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12)
- `category` (optional): Filter by category
- `featured` (optional): Filter featured projects

**Response:**
```json
{
  "success": true,
  "count": 6,
  "total": 6,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "project-id",
      "title": "E-Commerce Platform",
      "description": "Full-stack e-commerce solution",
      "image": "https://example.com/image.jpg",
      "liveUrl": "https://demo.com",
      "githubUrl": "https://github.com/user/repo",
      "technologies": ["React", "Node.js", "MongoDB"],
      "category": "Web Development",
      "featured": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST /projects
Create a new project (Protected).

**Request Body:**
```json
{
  "title": "My New Project",
  "description": "Project description",
  "image": "https://example.com/image.jpg",
  "liveUrl": "https://demo.com",
  "githubUrl": "https://github.com/user/repo",
  "technologies": ["React", "Node.js"],
  "category": "Web Development",
  "featured": false
}
```

#### PUT /projects/:id
Update a project (Protected).

#### DELETE /projects/:id
Delete a project (Protected).

### Skills

#### GET /skills
Get all skills.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "skill-id",
      "name": "JavaScript",
      "category": "Programming",
      "level": "Advanced",
      "percentage": 90,
      "userId": "user-id",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST /skills
Create a new skill (Protected).

**Request Body:**
```json
{
  "name": "React",
  "category": "Frontend",
  "level": "Advanced",
  "percentage": 85
}
```

### Students

#### GET /students/profile/me
Get current user's profile (Protected).

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "student-id",
    "userId": "user-id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "bio": "Full-stack developer",
    "skills": ["JavaScript", "React", "Node.js"],
    "portfolio": "https://johndoe.com",
    "github": "https://github.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe",
    "profileImage": "https://example.com/avatar.jpg",
    "gpa": 3.8,
    "status": "active"
  }
}
```

#### PUT /students/profile/me
Update current user's profile (Protected).

### Courses

#### GET /courses
Get all courses.

#### POST /courses
Create a new course (Protected).

#### GET /courses/:id
Get course by ID.

#### PUT /courses/:id
Update course (Protected).

#### DELETE /courses/:id
Delete course (Protected).

### Blogs

#### GET /blogs
Get all blog posts.

#### POST /blogs
Create a new blog post (Protected).

#### GET /blogs/:id
Get blog post by ID.

#### PUT /blogs/:id
Update blog post (Protected).

#### DELETE /blogs/:id
Delete blog post (Protected).

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error information (development only)"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Rate Limiting

API requests are limited to 100 requests per 15-minute window per IP address.

## CORS

The API supports CORS for the following origins:
- `http://localhost:3000` (development)
- `https://portfolio-app-kappa-red.vercel.app` (production)