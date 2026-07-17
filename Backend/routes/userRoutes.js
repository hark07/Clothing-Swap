import express from "express";

import {
  updateProfile,
  updateProfileImage,
} from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.put("/profile", protect, updateProfile);

router.put(
  "/profile-image",
  protect,
  upload.single("image"),
  updateProfileImage,
);

export default router;
