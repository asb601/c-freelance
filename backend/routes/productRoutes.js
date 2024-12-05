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
} from "../controllers/productController.js";

const router = express.Router();

// Product Routes
router.post("/products", createProduct); // Create a product
router.get("/products", getProducts); // Get all products
router.get("/products/:id", getProductById); // Get a product by ID
router.put("/products/:id", updateProduct); // Update a product
router.delete("/products/:id", deleteProduct); // Delete a product

// Cart Routes
router.post("/cart", addToCart); // Add to cart
router.delete("/cart/:id", removeFromCart); // Remove from cart
router.get("/cart/:userId", getCart); // Get user's cart

export default router;
