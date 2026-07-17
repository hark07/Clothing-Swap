import express from "express";

import {
  getDashboard,
  getUsers,
  blockUser,
  unblockUser,
  getItems,
  deleteItem,
  getAllSwaps,
  getReports,
  resolveReport,
} from "../controllers/adminController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, adminOnly, getDashboard);

router.get("/users", protect, adminOnly, getUsers);

router.put("/users/:id/block", protect, adminOnly, blockUser);

router.put("/users/:id/unblock", protect, adminOnly, unblockUser);

router.get("/items", protect, adminOnly, getItems);

router.delete("/items/:id", protect, adminOnly, deleteItem);

router.get("/swaps", protect, adminOnly, getAllSwaps);

router.get("/reports", protect, adminOnly, getReports);

router.put("/reports/:id/resolve", protect, adminOnly, resolveReport);

export default router;
