import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createSwapRequest,
  getSwaps,
  acceptSwap,
  rejectSwap,
  cancelSwap,
  completeSwap,
} from "../controllers/swapController.js";

const router = express.Router();

router.post("/", protect, createSwapRequest);

router.get("/", protect, getSwaps);

router.put("/:id/accept", protect, acceptSwap);

router.put("/:id/reject", protect, rejectSwap);

router.put("/:id/cancel", protect, cancelSwap);

router.put("/:id/complete", protect, completeSwap);

export default router;
