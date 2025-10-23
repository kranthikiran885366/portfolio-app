import express from "express"
import {
  getAllProjects,
  getProjectById,
  getMyProjects,
  createProject,
  updateProject,
  deleteProject,
  likeProject,
} from "../controllers/projectController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.get("/", getAllProjects)
router.get("/my", protect, getMyProjects)
router.post("/", protect, createProject)
router.get("/:id", getProjectById)
router.put("/:id", protect, updateProject)
router.delete("/:id", protect, deleteProject)
router.post("/:id/like", protect, likeProject)

export default router