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

// Database Connection
connectDB();

const app = express();

const server = http.createServer(app);

// Allowed Frontends

const allowedOrigins = [
  "http://localhost:5173",

  "https://clothing-swap-admin.vercel.app",
];

// Socket.IO

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,

    credentials: true,
  },
});

chatSocket(io);

// CORS

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
  }),
);

// Handle OPTIONS request

app.options("*", cors());

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

// Cloudinary use गरेपछि uploads folder चाहिँदैन

// Remove this:
// app.use("/uploads", express.static("uploads"));

// Test Route

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Clothing Swap API Running 🚀",

    status: "success",
  });
});

// 404 Route

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Error Handler

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Server Error",

    error: err.message,
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
