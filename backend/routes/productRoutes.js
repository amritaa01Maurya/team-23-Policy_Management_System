import express from "express";
import { getProducts, createProduct } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, requireRole("ADMIN"), createProduct);

export default router;
