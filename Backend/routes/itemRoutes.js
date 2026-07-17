import express from "express";

import {
  createItem,
  getItems,
  getMyItems,
  getItemById,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router;
router
  .route("/")
  .get(getItems)
  .post(protect, upload.array("images", 5), createItem);

/* IMPORTANT: Put this BEFORE /:id */
router.get("/my-items", protect, getMyItems);

router
  .route("/:id")
  .get(getItemById)
  .put(protect, updateItem)
  .delete(protect, deleteItem);

export default router;
