import express from "express"
import {
  getAllCourses,
  getCourseById,
  getMyCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  completeCourse,
  addReview,
} from "../controllers/courseController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.get("/", getAllCourses)
router.get("/my", protect, getMyCourses)
router.post("/", protect, createCourse)
router.get("/:id", getCourseById)
router.put("/:id", protect, updateCourse)
router.delete("/:id", protect, deleteCourse)
router.post("/:id/enroll", protect, enrollInCourse)
router.post("/:id/complete", protect, completeCourse)
router.post("/:id/review", protect, addReview)

export default router