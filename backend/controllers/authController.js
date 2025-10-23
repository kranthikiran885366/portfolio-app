import User from "../models/User.js"
import Student from "../models/Student.js"
import jwt from "jsonwebtoken"

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "7d",
  })
}

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please provide all required fields" })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: "student",
    })

    // Create student profile
    const [firstName, ...lastNameParts] = name.split(" ")
    const lastName = lastNameParts.join(" ") || "User"

    await Student.create({
      userId: user._id,
      firstName,
      lastName,
      email,
    })

    const token = generateToken(user._id, user.role)

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" })
    }

    // Check for user
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Check password
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = generateToken(user._id, user.role)

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const student = await Student.findOne({ userId: req.user.id })

    res.status(200).json({
      success: true,
      user,
      student,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
