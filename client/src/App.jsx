import React from "react";
import { Routes, Route } from "react-router-dom";
import Headers from "./components/Headers";
import Contacts from "./pages/Contacts";
import CricketBats from "./pages/CricketBats";
import Kits from "./pages/Kits";
import Jerseys from "./pages/Jerseys";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetials";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      {/* Navigation Header */}
      <Headers />
      {/* Application Routes */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/cricket-bats" element={<CricketBats />} />
        <Route path="/kits" element={<Kits />} />
        <Route path="/jerseys" element={<Jerseys />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/AllProducts" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
