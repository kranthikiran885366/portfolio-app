import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 300,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Technology", "Programming", "Career", "Tutorial", "News", "Opinion", "Other"],
  },
  tags: [{
    type: String,
    trim: true,
  }],
  featuredImage: {
    type: String,
    default: "",
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    replies: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }]
  }],
  readTime: {
    type: Number, // in minutes
    default: 5,
  },
  seoTitle: {
    type: String,
    default: "",
  },
  seoDescription: {
    type: String,
    default: "",
  },
  publishedAt: {
    type: Date,
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

// Generate slug from title
blogSchema.pre("save", function (next) {
  if (this.isModified("title") && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, "-")
  }
  
  // Calculate read time based on content length
  if (this.isModified("content")) {
    const wordsPerMinute = 200
    const wordCount = this.content.split(/\s+/).length
    this.readTime = Math.ceil(wordCount / wordsPerMinute)
  }
  
  this.updatedAt = Date.now()
  
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = Date.now()
  }
  
  next()
})

export default mongoose.model("Blog", blogSchema)