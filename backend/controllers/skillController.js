import Skill from "../models/Skill.js"

export const getAllSkills = async (req, res) => {
  try {
    const { category, level, userId } = req.query
    
    let query = {}
    
    if (category) query.category = category
    if (level) query.level = level
    if (userId) query.userId = userId

    const skills = await Skill.find(query)
      .populate("userId", "name email")
      .populate("projects", "title description")
      .sort({ percentage: -1 })

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMySkills = async (req, res) => {
  try {
    const skills = await Skill.find({ userId: req.user.id })
      .populate("projects", "title description")
      .sort({ percentage: -1 })
    
    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createSkill = async (req, res) => {
  try {
    const skillData = {
      ...req.body,
      userId: req.user.id,
    }

    const skill = await Skill.create(skillData)
    
    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    )

    if (!skill) {
      return res.status(404).json({ message: "Skill not found or unauthorized" })
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    
    if (!skill) {
      return res.status(404).json({ message: "Skill not found or unauthorized" })
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getSkillCategories = async (req, res) => {
  try {
    const categories = await Skill.distinct("category")
    
    res.status(200).json({
      success: true,
      data: categories,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}