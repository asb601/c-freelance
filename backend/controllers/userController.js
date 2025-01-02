import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';


export const registerUser = async (req, res) => {
  const { name, email, password, phoneNumber, address, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        password: hashedPassword,
        phoneNumber: phoneNumber || null,
        address: address || null,
       
      },
    });

    res.status(201).json({
      message: `${role || "User"} registered successfully`,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check role
    if (role && user.role !== role) {
      return res.status(403).json({ message: `Access denied for ${role}` });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send token as HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true, // Set to 'true' for production (HTTPS required)
      sameSite: "None", // Allow cross-origin cookie sharing
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ message: `${role || "User"} login successful` });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed" });
  }
};




export const updateUserProfile = async (req, res) => {
  const { name, phoneNumber, address } = req.body;
  const updatedUser = await prisma.user.update({
    where: { id: req.user.id },
    data: { name, phoneNumber, address },
  });
  res.json(updatedUser);
};



export const getUserProfile = async (req, res) => {
  try {
    // Ensure `req.user` contains the decoded token
    console.log("req.user in getUserProfile:", req.user);

    // Extract user ID from the token
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID is missing" });
    }

    // Fetch user profile from the database
    const user = await prisma.user.findUnique({
      where: { id: userId }, // Use the correct `id` field
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user)
    // Send the user profile data
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({ message: "Failed to fetch user profile", error: error.message });
  }
};


  export const getUserOrders = async (req, res) => {
    try {
      console.log("entered")
      const userId = req.user.id; // Assuming `req.user` contains the authenticated user info
  
      // Fetch orders for the user
      const orders = await prisma.order.findMany({
        where: { userId },
        include: {
          orderItems: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  images: true, // Include product images if available
                },
              },
            },
          },
          payment: {
            select: {
              id: true,
              paymentMethod: true,
              status: true,
              amount: true,
              transactionId: true,
            },
          },
        },
      });
  
      if (!orders || orders.length === 0) {
        console.log("no orders foung ")
        return res.status(404).json({ message: "No orders found" });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.log("entered catch ")
      console.error("Error fetching user orders:", error.message);
      res.status(500).json({ message: "Failed to fetch user orders", error: error.message });
    }
  };
  