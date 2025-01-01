import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addToCart,
  removeFromCart,
  getCart,
  upload
} from "../controllers/productController.js";
import { authenticate } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Product Routes (No `authenticate` for products)
router.post("/products", upload.array("images", 5), createProduct); // Create a product
router.get("/products", getProducts); // Get all products
router.get("/products/:id", getProductById); // Get a product by ID
router.put("/products/:id", updateProduct); // Update a product
router.delete("/products/:id", deleteProduct); // Delete a product

// Cart Routes (Keep `authenticate` here)
router.post("/cart", authenticate, addToCart); // Add to cart
router.delete("/cart/:id", authenticate, removeFromCart); // Remove from cart
router.get("/getCart", authenticate, getCart); // Get user's cart

export default router;
