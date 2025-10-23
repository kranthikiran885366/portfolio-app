# Database Schema Documentation

## Overview

The Portfolio Builder application uses MongoDB as its primary database with Mongoose ODM for schema definition and validation.

## Database Models

### User Model

The User model handles authentication and basic user information.

```javascript
{
  _id: ObjectId,
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Student Model

Extended profile information for users.

```javascript
{
  _id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  phone: String,
  bio: String,
  skills: [String],
  portfolio: String,
  github: String,
  linkedin: String,
  profileImage: String,
  enrolledCourses: [{
    type: ObjectId,
    ref: 'Course'
  }],
  completedCourses: [{
    type: ObjectId,
    ref: 'Course'
  }],
  gpa: {
    type: Number,
    min: 0,
    max: 4,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Project Model

Portfolio projects and showcases.

```javascript
{
  _id: ObjectId,
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  liveUrl: String,
  githubUrl: String,
  technologies: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['Web Development', 'Mobile Development', 'Design', 'Data Science', 'Other']
  },
  featured: {
    type: Boolean,
    default: false
  },
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Skill Model

User skills and proficiency levels.

```javascript
{
  _id: ObjectId,
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Design', 'Other']
  },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Course Model

Learning courses and educational content.

```javascript
{
  _id: ObjectId,
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Programming', 'Design', 'Business', 'Marketing', 'Other']
  },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  duration: {
    type: Number, // in hours
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  image: String,
  syllabus: [String],
  prerequisites: [String],
  tags: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  enrolledStudents: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Blog Model

Blog posts and articles.

```javascript
{
  _id: ObjectId,
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: String,
  category: {
    type: String,
    required: true,
    enum: ['Technology', 'Design', 'Career', 'Tutorial', 'News', 'Other']
  },
  tags: [String],
  author: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: ObjectId,
      ref: 'User'
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Portfolio Model

Portfolio configuration and customization.

```javascript
{
  _id: ObjectId,
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  tagline: String,
  about: String,
  theme: {
    primaryColor: {
      type: String,
      default: '#6366f1'
    },
    secondaryColor: {
      type: String,
      default: '#f59e0b'
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    textColor: {
      type: String,
      default: '#1f2937'
    },
    fontFamily: {
      type: String,
      default: 'Inter'
    }
  },
  layout: {
    showHero: {
      type: Boolean,
      default: true
    },
    showAbout: {
      type: Boolean,
      default: true
    },
    showSkills: {
      type: Boolean,
      default: true
    },
    showProjects: {
      type: Boolean,
      default: true
    },
    showContact: {
      type: Boolean,
      default: true
    }
  },
  contact: {
    email: String,
    phone: String,
    location: String,
    website: String,
    linkedin: String,
    github: String,
    twitter: String
  },
  subdomain: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Notification Model

Real-time notifications system.

```javascript
{
  _id: ObjectId,
  recipient: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  sender: {
    type: ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    required: true,
    enum: ['like', 'comment', 'follow', 'course_enrollment', 'system']
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    default: {}
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

## Indexes

### Performance Indexes
- `User.email` - Unique index for fast user lookup
- `Student.userId` - Unique index for profile association
- `Project.userId` - Index for user's projects
- `Project.category` - Index for category filtering
- `Skill.userId` - Index for user's skills
- `Blog.slug` - Unique index for SEO-friendly URLs
- `Blog.author` - Index for author's posts
- `Notification.recipient` - Index for user notifications

### Text Search Indexes
- `Project.title, Project.description` - Full-text search
- `Blog.title, Blog.content` - Full-text search
- `Course.title, Course.description` - Full-text search

## Relationships

### One-to-One
- `User` ↔ `Student` (via userId)
- `User` ↔ `Portfolio` (via userId)

### One-to-Many
- `User` → `Project[]` (user's projects)
- `User` → `Skill[]` (user's skills)
- `User` → `Blog[]` (user's blog posts)
- `User` → `Course[]` (created courses)
- `User` → `Notification[]` (user notifications)

### Many-to-Many
- `Student` ↔ `Course[]` (enrolled/completed courses)
- `Blog` ↔ `User[]` (likes)

## Data Validation

### Email Validation
- Unique across User and Student models
- Lowercase transformation
- Valid email format required

### Password Security
- Minimum 6 characters
- Hashed using bcryptjs
- Never returned in API responses

### URL Validation
- Portfolio, GitHub, LinkedIn URLs validated
- Image URLs validated for projects and profiles

### Enum Validation
- Strict validation for categories, levels, statuses
- Prevents invalid data entry

## Migration Scripts

### Seed Data
```bash
# Seed sample projects
npm run seed-projects

# Seed sample courses
npm run seed-courses

# Seed sample skills
npm run seed-skills
```

## Backup Strategy

### Automated Backups
- Daily MongoDB Atlas backups
- Point-in-time recovery available
- Cross-region backup replication

### Manual Backup
```bash
# Export collection
mongodump --uri="mongodb+srv://..." --collection=users

# Import collection
mongorestore --uri="mongodb+srv://..." --collection=users
```