import express from "express"
import {
  getAllStudents,
  getStudentById,
  getMyProfile,
  updateStudentProfile,
  deleteStudent,
} from "../controllers/studentController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.get("/", getAllStudents)
router.get("/search", getAllStudents) // Same as getAllStudents but with search params
router.get("/profile/me", protect, getMyProfile)
router.put("/profile/me", protect, updateStudentProfile)
router.get("/:id", getStudentById)
router.delete("/:id", protect, deleteStudent)

export default router
