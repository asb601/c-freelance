import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new product
export const createProduct = async (req, res) => {
  const { name, description, price, imageUrl, category, addons, stock } = req.body;

  try {
    const product = await prisma.product.create({
      data: { name, description, price, imageUrl, category, addons, stock },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl, category, addons, stock } = req.body;

  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price, imageUrl, category, addons, stock },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add an item to the cart
export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Check if the user already has a cart
    let cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      // If no cart exists for the user, create one
      cart = await prisma.cart.create({
        data: { userId, items: [] },
      });
    }

    // Add item to the cart
    const cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove an item from the cart
export const removeFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    // Remove the cart item
    await prisma.cartItem.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the user's cart
export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } }, // Include product details in cart items
    });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
