import express from "express"
import {
  getAllSkills,
  getMySkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getSkillCategories,
} from "../controllers/skillController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.get("/", getAllSkills)
router.get("/categories", getSkillCategories)
router.get("/my", protect, getMySkills)
router.post("/", protect, createSkill)
router.put("/:id", protect, updateSkill)
router.delete("/:id", protect, deleteSkill)

export default router