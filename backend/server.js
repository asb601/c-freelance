import express from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
// Import routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// Initialize Express and Prisma
const app = express();
const prisma = new PrismaClient();
const PORT = 3000;
app.use(cookieParser())
// Middleware
app.use(
    cors({
      origin: "http://localhost:5173", // Update to your frontend URL
      credentials: true, // Allow cookies
    })
  );
  
app.use(bodyParser.json());

// Register routes
app.use("/api/users", userRoutes);       // User-related routes
app.use("/api/products", productRoutes); // Product and cart-related routes
app.use("/api/sales", salesRoutes);      // Sales and analytics routes
app.use("/api/payments", paymentRoutes); // Payment-related routes

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the E-Commerce API!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
