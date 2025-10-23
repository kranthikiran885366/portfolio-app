import express from "express"
import {
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  getMyBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  addComment,
  addReply,
  getBlogCategories,
  getBlogTags,
} from "../controllers/blogController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.get("/", getAllBlogs)
router.get("/categories", getBlogCategories)
router.get("/tags", getBlogTags)
router.get("/my", protect, getMyBlogs)
router.post("/", protect, createBlog)
router.get("/slug/:slug", getBlogBySlug)
router.get("/:id", getBlogById)
router.put("/:id", protect, updateBlog)
router.delete("/:id", protect, deleteBlog)
router.post("/:id/like", protect, likeBlog)
router.post("/:id/comments", protect, addComment)
router.post("/:id/comments/:commentId/replies", protect, addReply)

export default router