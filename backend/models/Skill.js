import mongoose from "mongoose"

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Frontend", "Backend", "Database", "DevOps", "Mobile", "Design", "Other"],
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
    required: true,
  },
  percentage: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    min: 0,
    default: 0,
  },
  certifications: [{
    name: String,
    issuer: String,
    date: Date,
    url: String,
  }],
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

skillSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.model("Skill", skillSchema)