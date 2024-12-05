import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';


export const registerUser = async (req, res) => {
    const { name, email, password, phoneNumber, address } = req.body;
  
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
        message: "User registered successfully",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  };
  

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("entered")
    // Fetch user from the database (replace with your actual DB logic)
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  
    // Generate JWT
    console.log("checked")
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d", // Token valid for 1 day
    });
  
    // Send token as HTTP-only secure cookie
    res.cookie("authToken", token, {
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === "production", // Send only over HTTPS in production
      sameSite: "strict", // Protect against CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    console.log("logged in ")
    res.status(200).json({ message: "Login successful" });
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
      // Retrieve the user ID from the authenticated user (req.user set by middleware)
      const userId = req.user.id;
  
      // Fetch the user from the database
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          address: true,
          createdAt: true,
          updatedAt: true,
        }, // Specify fields to retrieve to avoid returning sensitive data
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
      res.status(500).json({ message: "Failed to fetch user profile", error: error.message });
    }
  };
  