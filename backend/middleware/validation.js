import { body, validationResult } from "express-validator"

// Validation middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array()
    })
  }
  next()
}

// User validation rules
export const validateSignup = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match")
      }
      return true
    })
]

export const validateLogin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
]

// Project validation rules
export const validateProject = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),
  body("category")
    .isIn(["Web Development", "Mobile App", "Desktop App", "AI/ML", "Data Science", "Game Development", "Other"])
    .withMessage("Invalid category"),
  body("technologies")
    .isArray({ min: 1 })
    .withMessage("At least one technology is required"),
  body("githubUrl")
    .optional()
    .isURL()
    .withMessage("GitHub URL must be a valid URL"),
  body("liveUrl")
    .optional()
    .isURL()
    .withMessage("Live URL must be a valid URL")
]

// Skill validation rules
export const validateSkill = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Skill name must be between 2 and 50 characters"),
  body("category")
    .isIn(["Frontend", "Backend", "Database", "DevOps", "Mobile", "Design", "Other"])
    .withMessage("Invalid category"),
  body("level")
    .isIn(["Beginner", "Intermediate", "Advanced", "Expert"])
    .withMessage("Invalid level"),
  body("percentage")
    .isInt({ min: 0, max: 100 })
    .withMessage("Percentage must be between 0 and 100"),
  body("yearsOfExperience")
    .optional()
    .isInt({ min: 0, max: 50 })
    .withMessage("Years of experience must be between 0 and 50")
]

// Blog validation rules
export const validateBlog = [
  body("title")
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage("Title must be between 5 and 200 characters"),
  body("content")
    .trim()
    .isLength({ min: 100 })
    .withMessage("Content must be at least 100 characters"),
  body("excerpt")
    .trim()
    .isLength({ min: 10, max: 300 })
    .withMessage("Excerpt must be between 10 and 300 characters"),
  body("category")
    .isIn(["Technology", "Programming", "Career", "Tutorial", "News", "Opinion", "Other"])
    .withMessage("Invalid category"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array")
]

// Course validation rules
export const validateCourse = [
  body("title")
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage("Title must be between 5 and 200 characters"),
  body("description")
    .trim()
    .isLength({ min: 50 })
    .withMessage("Description must be at least 50 characters"),
  body("category")
    .isIn(["Web Development", "Mobile Development", "Data Science", "AI/ML", "DevOps", "Design", "Other"])
    .withMessage("Invalid category"),
  body("level")
    .isIn(["Beginner", "Intermediate", "Advanced"])
    .withMessage("Invalid level"),
  body("duration")
    .isInt({ min: 1 })
    .withMessage("Duration must be at least 1 hour"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number")
]

// Portfolio validation rules
export const validatePortfolio = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
  body("subdomain")
    .optional()
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Subdomain can only contain lowercase letters, numbers, and hyphens")
    .isLength({ min: 3, max: 30 })
    .withMessage("Subdomain must be between 3 and 30 characters")
]

// Comment validation rules
export const validateComment = [
  body("content")
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Comment must be between 1 and 1000 characters")
]

// Review validation rules
export const validateReview = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("comment")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Review comment must be between 10 and 500 characters")
]