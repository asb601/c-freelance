import express from "express";
import {
  getTotalProductsSold,
  getRevenueAnalytics,
  getProductsUploadedByCategory,
  getTopSellingProducts,
  getLowStockProducts,
} from "../controllers/salesController.js";
// Optional authentication

const router = express.Router();

// Analytics routes
router.get("/analytics/products-sold",  getTotalProductsSold);
router.get("/analytics/revenue",  getRevenueAnalytics);
router.get("/analytics/products-by-category",  getProductsUploadedByCategory);
router.get("/analytics/top-products", getTopSellingProducts);
router.get("/analytics/low-stock",  getLowStockProducts);

export default router;
