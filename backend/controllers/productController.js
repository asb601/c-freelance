import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

// Multer configuration for multiple files in memory
const storage = multer.memoryStorage();
export const upload = multer({ storage });

console.log({
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? "Exists" : "Missing",
});

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No image files provided" });
  }

  try {
    // Upload images to Cloudinary
    const imageUploadPromises = req.files.map((file) =>
      new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              return reject(error);
            }
            resolve(result.secure_url);
          }
        ).end(file.buffer);
      })
    );

    const uploadedImages = await Promise.all(imageUploadPromises);

    // Check if the category exists; if not, create it
    let categoryRecord = await prisma.category.findUnique({
      where: { name: category },
    });

    if (!categoryRecord) {
      categoryRecord = await prisma.category.create({
        data: { name: category },
      });
    }

    // Create the product
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        categoryId: categoryRecord.id, // Link the category
        stock: parseInt(stock, 10),
        images: uploadedImages, // Store image URLs
      },
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};






// Get all products
export const getProducts = async (req, res) => {
  try {
    // Include category if you want category details returned
    const products = await prisma.product.findMany({
      include: { category: true },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get a single product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({ where: { id } }); // No parseInt

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
  try {
    const userId = req.user.id; // Assuming `req.user` contains authenticated user info
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    // Check if the product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Get the user's cart or create one if it doesn't exist
    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    // Check if the item already exists in the cart
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id, // Link through the `cartId`
        productId,
      },
    });

    if (existingCartItem) {
      // Update quantity if the item exists
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });

      return res.status(200).json({ message: "Cart updated", cartItem: updatedCartItem });
    }

    // If the item doesn't exist, create a new cart item
    const newCartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id, // Link to the cart
        productId,
        quantity,
      },
    });

    res.status(201).json({ message: "Item added to cart", cartItem: newCartItem });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ message: "Failed to add to cart", error: error.message });
  }
};



// Remove an item from the cart
export const removeFromCart = async (req, res) => {
  const { id } = req.params; // cartItem ID
  const userId = req.user.id; // Get the userId from the authenticated user

  try {
    // Find the cart item for the specific user and cartItem ID
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: id,          // Find by cartItem ID
        cart: { userId }, // Ensure the cart belongs to the authenticated user
      },
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Delete the found cart item
    await prisma.cartItem.delete({
      where: {
        id: cartItem.id, // Use the cart item's id to delete it
      },
    });

    res.status(204).send(); // Successfully deleted, no content to return
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get the user's cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using authentication middleware to get the user's ID

    // Fetch the cart and associated items
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true, // Including product details for each cart item
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Return the cart items to the client
    console.log(cart.items)
    return res.status(200).json(cart.items);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};