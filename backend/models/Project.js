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
  image: {
    type: String,
    required: true,
  },
  liveUrl: {
    type: String,
  },
  githubUrl: {
    type: String,
  },
  technologies: [{
    type: String,
    required: true,
  }],
  category: {
    type: String,
    required: true,
    enum: ["Web Development", "Mobile Development", "Design", "Data Science", "Other"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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