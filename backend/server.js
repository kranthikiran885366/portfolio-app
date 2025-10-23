import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import mongoose from "mongoose"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import studentRoutes from "./routes/students.js"
import projectRoutes from "./routes/projects.js"
import skillRoutes from "./routes/skills.js"
import courseRoutes from "./routes/courses.js"
import blogRoutes from "./routes/blogs.js"
import portfolioRoutes from "./routes/portfolios.js"
import notificationRoutes from "./routes/notifications.js"
import { errorHandler, notFound } from "./middleware/errorHandler.js"

dotenv.config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
})
app.use("/api/", limiter)

// CORS middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "http://localhost:3000",
    "https://your-frontend-name.onrender.com"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/students", studentRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/skills", skillRoutes)
app.use("/api/courses", courseRoutes)
app.use("/api/blogs", blogRoutes)
app.use("/api/portfolios", portfolioRoutes)
app.use("/api/notifications", notificationRoutes)

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Portfolio Backend API",
    status: "running",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      students: "/api/students",
      projects: "/api/projects",
      skills: "/api/skills",
      courses: "/api/courses",
      blogs: "/api/blogs",
      portfolios: "/api/portfolios",
      notifications: "/api/notifications"
    }
  })
})

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "Backend is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  })
})

// 404 handler
app.use(notFound)

// Error handler
app.use(errorHandler)

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join-room', (room) => {
    socket.join(room)
  })

  socket.on('leave-room', (room) => {
    socket.leave(room)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// Make io available to routes
app.set('io', io)

const PORT = process.env.PORT || 10000
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`)
})
