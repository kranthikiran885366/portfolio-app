import Project from "../models/Project.js"

export const getAllProjects = async (req, res) => {
  try {
    const { category, featured, search, page = 1, limit = 10 } = req.query
    
    let query = {}
    
    if (category) query.category = category
    if (featured) query.featured = featured === 'true'
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } }
      ]
    }

    const projects = await Project.find(query)
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Project.countDocuments(query)

    res.status(200).json({
      success: true,
      count: projects.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: projects,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("userId", "name email")
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    // Increment views
    project.views += 1
    await project.save()

    res.status(200).json({
      success: true,
      data: project,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id }).sort({ createdAt: -1 })
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createProject = async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      userId: req.user.id,
    }

    const project = await Project.create(projectData)
    
    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    )

    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized" })
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    
    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized" })
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const likeProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    const isLiked = project.likes.includes(req.user.id)
    
    if (isLiked) {
      project.likes = project.likes.filter(id => id.toString() !== req.user.id)
    } else {
      project.likes.push(req.user.id)
    }

    await project.save()

    res.status(200).json({
      success: true,
      message: isLiked ? "Project unliked" : "Project liked",
      data: { likes: project.likes.length, isLiked: !isLiked },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}