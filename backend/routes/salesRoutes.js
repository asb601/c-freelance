import express from "express";
import {
  getTotalProductsSold,
  getRevenueAnalytics,
  getProductsUploadedByCategory,
  getTopSellingProducts,
  getLowStockProducts,
} from "../controllers/salesController.js";
import { authenticate } from "../middlewares/authMiddlewares.js"; // Optional authentication

const router = express.Router();

// Analytics routes
router.get("/analytics/products-sold", authenticate, getTotalProductsSold);
router.get("/analytics/revenue", authenticate, getRevenueAnalytics);
router.get("/analytics/products-by-category", authenticate, getProductsUploadedByCategory);
router.get("/analytics/top-products", authenticate, getTopSellingProducts);
router.get("/analytics/low-stock", authenticate, getLowStockProducts);

export default router;
