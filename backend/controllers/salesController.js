import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 1. Get Total Products Sold
export const getTotalProductsSold = async (req, res) => {
  try {
    const totalSold = await prisma.sale.aggregate({
      _sum: { quantity: true },
    });

    res.status(200).json({ totalProductsSold: totalSold._sum.quantity || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Get Revenue Analytics
export const getRevenueAnalytics = async (req, res) => {
  try {
    const totalRevenue = await prisma.sale.aggregate({
      _sum: { totalPrice: true },
    });

    res.status(200).json({ totalRevenue: totalRevenue._sum.totalPrice || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Get Products Uploaded by Category
export const getProductsUploadedByCategory = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
    });

    const result = categories.map((category) => ({
      category: category.name,
      totalProducts: category.products.length,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Get Top-Selling Products
export const getTopSellingProducts = async (req, res) => {
  try {
    const topProducts = await prisma.sale.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5, // Top 5 products
    });

    // Fetch product details
    const products = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.product.findUnique({ where: { id: item.productId } });
        return {
          productName: product.name,
          totalSold: item._sum.quantity,
        };
      })
    );

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Get Low Stock Products
export const getLowStockProducts = async (req, res) => {
  try {
    const lowStockProducts = await prisma.product.findMany({
      where: { stock: { lte: 10 } }, // Low stock threshold (<= 10)
      select: { id: true, name: true, stock: true },
    });

    res.status(200).json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
