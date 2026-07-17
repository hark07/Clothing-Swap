import express from "express";

import {
  createReport,
  getMyReports,
  getReportById,
} from "../controllers/reportController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createReport);

router.get("/my-reports", protect, getMyReports);

router.get("/:id", protect, getReportById);

export default router;
