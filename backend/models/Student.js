import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    default: "",
  },
  skills: [
    {
      type: String,
      trim: true,
    },
  ],
  portfolio: {
    type: String,
    default: "",
  },
  github: {
    type: String,
    default: "",
  },
  linkedin: {
    type: String,
    default: "",
  },
  profileImage: {
    type: String,
    default: "",
  },
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  completedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  gpa: {
    type: Number,
    default: 0,
    min: 0,
    max: 4,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "graduated"],
    default: "active",
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

// Update the updatedAt field before saving
studentSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.model("Student", studentSchema)
