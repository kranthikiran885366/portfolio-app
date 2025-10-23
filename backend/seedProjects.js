import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from './models/Project.js'

dotenv.config()

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React and Node.js",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500",
    liveUrl: "https://ecommerce-demo.netlify.app",
    githubUrl: "https://github.com/example/ecommerce",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Web Development",
    featured: true
  },
  {
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500",
    liveUrl: "https://taskapp-demo.vercel.app",
    githubUrl: "https://github.com/example/taskapp",
    technologies: ["React", "Firebase", "Material-UI"],
    category: "Web Development",
    featured: true
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather data with interactive charts",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500",
    liveUrl: "https://weather-dash.netlify.app",
    githubUrl: "https://github.com/example/weather",
    technologies: ["JavaScript", "Chart.js", "OpenWeather API"],
    category: "Web Development",
    featured: false
  },
  {
    title: "Mobile Banking App",
    description: "Secure mobile banking interface design",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500",
    liveUrl: "https://banking-ui.figma.com",
    githubUrl: null,
    technologies: ["Figma", "UI/UX Design", "Prototyping"],
    category: "Design",
    featured: true
  },
  {
    title: "Restaurant Website",
    description: "Modern restaurant website with online ordering",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
    liveUrl: "https://restaurant-demo.netlify.app",
    githubUrl: "https://github.com/example/restaurant",
    technologies: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "Web Development",
    featured: false
  },
  {
    title: "Fitness Tracker",
    description: "Personal fitness tracking mobile application",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
    liveUrl: "https://fitness-tracker.app",
    githubUrl: "https://github.com/example/fitness",
    technologies: ["React Native", "Redux", "Firebase"],
    category: "Mobile Development",
    featured: true
  }
]

async function seedProjects() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
    
    await Project.deleteMany({})
    await Project.insertMany(projects)
    
    console.log('Project data seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding projects:', error)
    process.exit(1)
  }
}

seedProjects()