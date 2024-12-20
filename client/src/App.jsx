import React from "react";
import { Routes, Route } from "react-router-dom";
import Headers from "./components/Headers";
import Contacts from "./pages/User/Contacts";

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

export default function App() {
  return (
    <>
      {/* Navigation Header */}
      <Headers />
      {/* User Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/AllProducts" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}


