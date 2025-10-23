import Portfolio from "../models/Portfolio.js"
import User from "../models/User.js"

export const getAllPortfolios = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query
    
    let query = { isPublic: true }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { tagline: { $regex: search, $options: 'i' } },
        { about: { $regex: search, $options: 'i' } }
      ]
    }

    const portfolios = await Portfolio.find(query)
      .populate("userId", "name email")
      .select("-analytics") // Exclude sensitive analytics data
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Portfolio.countDocuments(query)

    res.status(200).json({
      success: true,
      count: portfolios.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: portfolios,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id)
      .populate("userId", "name email")

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" })
    }

    if (!portfolio.isPublic && portfolio.userId._id.toString() !== req.user?.id) {
      return res.status(403).json({ message: "Portfolio is private" })
    }

    // Increment views if not the owner
    if (req.user?.id !== portfolio.userId._id.toString()) {
      portfolio.views += 1
      portfolio.lastViewedAt = Date.now()
      await portfolio.save()
    }

    res.status(200).json({
      success: true,
      data: portfolio,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getPortfolioBySubdomain = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ 
      subdomain: req.params.subdomain,
      isPublic: true 
    }).populate("userId", "name email")

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" })
    }

    // Increment views
    portfolio.views += 1
    portfolio.lastViewedAt = Date.now()
    await portfolio.save()

    res.status(200).json({
      success: true,
      data: portfolio,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyPortfolio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ userId: req.user.id })
      .populate("userId", "name email")

    if (!portfolio) {
      // Create default portfolio if doesn't exist
      const user = await User.findById(req.user.id)
      const subdomain = user.name.toLowerCase().replace(/[^a-z0-9]/g, '') + Math.random().toString(36).substr(2, 4)
      
      portfolio = await Portfolio.create({
        userId: req.user.id,
        title: `${user.name}'s Portfolio`,
        subdomain,
        layout: {
          sectionsOrder: ["hero", "about", "skills", "projects", "contact"]
        }
      })
      
      await portfolio.populate("userId", "name email")
    }

    res.status(200).json({
      success: true,
      data: portfolio,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createPortfolio = async (req, res) => {
  try {
    // Check if user already has a portfolio
    const existingPortfolio = await Portfolio.findOne({ userId: req.user.id })
    
    if (existingPortfolio) {
      return res.status(400).json({ message: "Portfolio already exists. Use update instead." })
    }

    const portfolioData = {
      ...req.body,
      userId: req.user.id,
    }

    // Generate subdomain if not provided
    if (!portfolioData.subdomain) {
      const user = await User.findById(req.user.id)
      portfolioData.subdomain = user.name.toLowerCase().replace(/[^a-z0-9]/g, '') + Math.random().toString(36).substr(2, 4)
    }

    const portfolio = await Portfolio.create(portfolioData)
    
    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      data: portfolio,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true, runValidators: true, upsert: true }
    )

    res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
      data: portfolio,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndDelete({ userId: req.user.id })
    
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" })
    }

    res.status(200).json({
      success: true,
      message: "Portfolio deleted successfully",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const checkSubdomainAvailability = async (req, res) => {
  try {
    const { subdomain } = req.params
    
    if (!/^[a-z0-9-]+$/.test(subdomain)) {
      return res.status(400).json({ 
        message: "Subdomain can only contain lowercase letters, numbers, and hyphens" 
      })
    }

    const existingPortfolio = await Portfolio.findOne({ subdomain })
    
    res.status(200).json({
      success: true,
      available: !existingPortfolio,
      message: existingPortfolio ? "Subdomain is already taken" : "Subdomain is available"
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updatePortfolioTheme = async (req, res) => {
  try {
    const { theme } = req.body
    
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.user.id },
      { theme },
      { new: true, runValidators: true }
    )

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" })
    }

    res.status(200).json({
      success: true,
      message: "Portfolio theme updated successfully",
      data: portfolio,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updatePortfolioLayout = async (req, res) => {
  try {
    const { layout } = req.body
    
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.user.id },
      { layout },
      { new: true, runValidators: true }
    )

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" })
    }

    res.status(200).json({
      success: true,
      message: "Portfolio layout updated successfully",
      data: portfolio,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}