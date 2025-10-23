import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Web Development", "Mobile Development", "Data Science", "AI/ML", "DevOps", "Design", "Other"],
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  duration: {
    type: Number, // in hours
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  thumbnail: {
    type: String,
    default: "",
  },
  syllabus: [{
    title: String,
    description: String,
    duration: Number, // in minutes
  }],
  prerequisites: [{
    type: String,
    trim: true,
  }],
  learningOutcomes: [{
    type: String,
    trim: true,
  }],
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  completedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],
  isPublished: {
    type: Boolean,
    default: false,
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

courseSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.model("Course", courseSchema)