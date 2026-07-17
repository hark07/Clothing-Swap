import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

import { Server } from "socket.io";

import connectDB from "./config/db.js";

import chatSocket from "./sockets/chatSocket.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import swapRoutes from "./routes/swapRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

// Connect Database
connectDB();

const app = express();

const server = http.createServer(app);

// Socket.IO Configuration

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://clothing-swap-admin.vercel.app"],
    credentials: true,
  },
});

chatSocket(io);

// CORS Configuration

app.use(
  cors({
    origin: ["http://localhost:5173", "https://clothing-swap-admin.vercel.app"],

    credentials: true,

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Body Parser

app.use(
  express.json({
    limit: "10mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  }),
);

// API Routes

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/items", itemRoutes);

app.use("/api/swaps", swapRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/reports", reportRoutes);

// Cloudinary use गरेकोले uploads folder चाहिँदैन

// Test Route

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Clothing Swap API Running 🚀",
    status: "success",
  });
});

// Global Error Handler

app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

// Server Start

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
