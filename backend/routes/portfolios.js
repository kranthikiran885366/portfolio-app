import express from "express"
import {
  getAllPortfolios,
  getPortfolioById,
  getPortfolioBySubdomain,
  getMyPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  checkSubdomainAvailability,
  updatePortfolioTheme,
  updatePortfolioLayout,
} from "../controllers/portfolioController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.get("/", getAllPortfolios)
router.get("/my", protect, getMyPortfolio)
router.post("/", protect, createPortfolio)
router.put("/", protect, updatePortfolio)
router.delete("/", protect, deletePortfolio)
router.get("/check-subdomain/:subdomain", checkSubdomainAvailability)
router.put("/theme", protect, updatePortfolioTheme)
router.put("/layout", protect, updatePortfolioLayout)
router.get("/subdomain/:subdomain", getPortfolioBySubdomain)
router.get("/:id", getPortfolioById)

export default router