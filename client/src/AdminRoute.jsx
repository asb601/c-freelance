import React from "react";
import { Routes, Route } from "react-router-dom";
import Headers from "./components/Headers";
import Contacts from "./pages/User/Contacts";
import CricketBats from "./pages/User/CricketBats";
import Kits from "./pages/User/Kits";
import Jerseys from "./pages/User/Jerseys";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import Home from "./pages/User/Home";
import ProductPage from "./pages/User/ProductsPage";
import ProductDetails from "./pages/User/ProductDetials";
import Cart from "./pages/User/Cart";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminSignup from "./pages/Admin/AdminSignup";
import AdminHome from "./pages/Admin/AdminHome"; // Admin Home
import AddProduct from "./pages/Admin/AddProduct"; // Admin Add Product
import AdminDashboard from "./pages/Admin/AdminDashboard"; // Admin Dashboard



export default function AdminRoutes() {
  return (
    <>
    
      {/* Admin Routes */}
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/signup" element={<AdminSignup />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}
