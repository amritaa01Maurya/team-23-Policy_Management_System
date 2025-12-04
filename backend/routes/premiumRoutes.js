import express from "express";
import { calculate } from "../controllers/premiumController.js";

const router = express.Router();

router.post("/calculate", calculate);

export default router;
