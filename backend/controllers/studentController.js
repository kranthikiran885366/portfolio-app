import Student from "../models/Student.js"

export const getAllStudents = async (req, res) => {
  try {
    const { search, skills, status, page = 1, limit = 10 } = req.query
    
    let query = {}
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } }
      ]
    }
    
    if (skills) {
      const skillsArray = skills.split(',')
      query.skills = { $in: skillsArray }
    }
    
    if (status) {
      query.status = status
    }

    const students = await Student.find(query)
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Student.countDocuments(query)

    res.status(200).json({
      success: true,
      count: students.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: students,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("userId", "name email")
    if (!student) {
      return res.status(404).json({ message: "Student not found" })
    }
    res.status(200).json({
      success: true,
      data: student,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id }).populate("userId", "name email")
    if (!student) {
      return res.status(404).json({ message: "Student profile not found" })
    }
    res.status(200).json({
      success: true,
      data: student,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateStudentProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, bio, skills, portfolio, github, linkedin, profileImage } = req.body

    const student = await Student.findOneAndUpdate(
      { userId: req.user.id },
      {
        firstName,
        lastName,
        phone,
        bio,
        skills: skills || [],
        portfolio,
        github,
        linkedin,
        profileImage,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true },
    )

    if (!student) {
      return res.status(404).json({ message: "Student profile not found" })
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: student,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)
    if (!student) {
      return res.status(404).json({ message: "Student not found" })
    }
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
