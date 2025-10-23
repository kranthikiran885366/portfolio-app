import Course from "../models/Course.js"

export const getAllCourses = async (req, res) => {
  try {
    const { category, level, search, page = 1, limit = 10, published = true } = req.query
    
    let query = {}
    
    if (published === 'true') query.isPublished = true
    if (category) query.category = category
    if (level) query.level = level
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { prerequisites: { $in: [new RegExp(search, 'i')] } }
      ]
    }

    const courses = await Course.find(query)
      .populate("instructor", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Course.countDocuments(query)

    res.status(200).json({
      success: true,
      count: courses.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: courses,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name email")
      .populate("enrolledStudents", "name email")

    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    res.status(200).json({
      success: true,
      data: course,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyCourses = async (req, res) => {
  try {
    const { type = "enrolled" } = req.query // enrolled, created, completed
    
    let query = {}
    
    if (type === "created") {
      query.instructor = req.user.id
    } else if (type === "enrolled") {
      query.enrolledStudents = req.user.id
    } else if (type === "completed") {
      query.completedStudents = req.user.id
    }

    const courses = await Course.find(query)
      .populate("instructor", "name email")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createCourse = async (req, res) => {
  try {
    const courseData = {
      ...req.body,
      instructor: req.user.id,
    }

    const course = await Course.create(courseData)
    
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, instructor: req.user.id },
      req.body,
      { new: true, runValidators: true }
    )

    if (!course) {
      return res.status(404).json({ message: "Course not found or unauthorized" })
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ 
      _id: req.params.id, 
      instructor: req.user.id 
    })
    
    if (!course) {
      return res.status(404).json({ message: "Course not found or unauthorized" })
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    if (course.enrolledStudents.includes(req.user.id)) {
      return res.status(400).json({ message: "Already enrolled in this course" })
    }

    course.enrolledStudents.push(req.user.id)
    await course.save()

    res.status(200).json({
      success: true,
      message: "Successfully enrolled in course",
      data: course,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const completeCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    if (!course.enrolledStudents.includes(req.user.id)) {
      return res.status(400).json({ message: "Not enrolled in this course" })
    }

    if (course.completedStudents.includes(req.user.id)) {
      return res.status(400).json({ message: "Course already completed" })
    }

    course.completedStudents.push(req.user.id)
    await course.save()

    res.status(200).json({
      success: true,
      message: "Course completed successfully",
      data: course,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body
    const course = await Course.findById(req.params.id)
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Check if user has completed the course
    if (!course.completedStudents.includes(req.user.id)) {
      return res.status(400).json({ message: "Must complete course before reviewing" })
    }

    // Check if user already reviewed
    const existingReview = course.reviews.find(
      review => review.user.toString() === req.user.id
    )

    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this course" })
    }

    course.reviews.push({
      user: req.user.id,
      rating,
      comment,
    })

    // Update average rating
    const totalRating = course.reviews.reduce((sum, review) => sum + review.rating, 0)
    course.rating.average = totalRating / course.reviews.length
    course.rating.count = course.reviews.length

    await course.save()

    res.status(200).json({
      success: true,
      message: "Review added successfully",
      data: course,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}