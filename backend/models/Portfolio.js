import mongoose from "mongoose"

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  tagline: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  theme: {
    primaryColor: {
      type: String,
      default: "#6366f1",
    },
    secondaryColor: {
      type: String,
      default: "#f59e0b",
    },
    backgroundColor: {
      type: String,
      default: "#ffffff",
    },
    textColor: {
      type: String,
      default: "#1f2937",
    },
    fontFamily: {
      type: String,
      default: "Inter",
    }
  },
  layout: {
    showHero: {
      type: Boolean,
      default: true,
    },
    showAbout: {
      type: Boolean,
      default: true,
    },
    showSkills: {
      type: Boolean,
      default: true,
    },
    showProjects: {
      type: Boolean,
      default: true,
    },
    showContact: {
      type: Boolean,
      default: true,
    },
    sectionsOrder: [{
      type: String,
      enum: ["hero", "about", "skills", "projects", "contact"],
    }]
  },
  contact: {
    email: String,
    phone: String,
    location: String,
    website: String,
    linkedin: String,
    github: String,
    twitter: String,
    instagram: String,
  },
  resume: {
    url: String,
    filename: String,
    uploadedAt: Date,
  },
  customDomain: {
    type: String,
    unique: true,
    sparse: true,
  },
  subdomain: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, "Subdomain can only contain lowercase letters, numbers, and hyphens"],
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  lastViewedAt: {
    type: Date,
  },
  seo: {
    title: String,
    description: String,
    keywords: [String],
    ogImage: String,
  },
  analytics: {
    googleAnalyticsId: String,
    facebookPixelId: String,
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

portfolioSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.model("Portfolio", portfolioSchema)