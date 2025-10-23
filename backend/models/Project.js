import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Web Development", "Mobile App", "Desktop App", "AI/ML", "Data Science", "Game Development", "Other"],
  },
  technologies: [{
    type: String,
    trim: true,
  }],
  githubUrl: {
    type: String,
    trim: true,
  },
  liveUrl: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["In Progress", "Completed", "Archived"],
    default: "In Progress",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

projectSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.model("Project", projectSchema)