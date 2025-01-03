import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Make sure JWT_SECRET is loaded

export const authenticate = (req, res, next) => {
  
  try {
    console.log("cookies: ",req.cookies)
    const token = req.cookies.authToken; // Extract token from cookies

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token is required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    console.log(decoded)
    req.user = decoded; // Attach decoded user info to the request

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(403).json({ message: "Forbidden: Invalid or expired token" });
  }
};
