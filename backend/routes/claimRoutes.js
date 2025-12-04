import express from "express";
import {
  createClaim,
  getAllClaims,
  updateClaimStatus,
  getMyClaims
} from "../controllers/claimController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, createClaim);
router.get("/my", protect, getMyClaims);
router.get("/", protect, requireRole("ADMIN", "ADJUSTER"), getAllClaims);
router.patch("/:id/status", protect, requireRole("ADJUSTER", "ADMIN"), updateClaimStatus);

export default router;
