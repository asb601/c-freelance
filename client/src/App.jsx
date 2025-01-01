import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import Headers from "./components/Headers";
import Contacts from "./pages/User/Contacts";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import Home from "./pages/User/Home";
import ProductPage from "./pages/User/ProductsPage";
import ProductDetails from "./pages/User/ProductDetials";
import Cart from "./pages/User/Cart";
import UserPage from "./pages/User/UserInfo";

export default function App() {
    return (
      <ThemeProvider>
      <div className="app-container">
        <Headers />
        <div className="content">
          <Routes>

                    {/* Home Page with Background Color */}
                    <Route
                        path="/"
                        element={
                            <div style={{ backgroundColor: "#f0f8ff" }}>
                                <Home />
                            </div>
                        }
                    />
                    {/* Products Page with Background Color */}
                    <Route
                        path="/Products"
                        element={
                            <div style={{ backgroundColor: "#f5f5dc" }}>
                                <ProductPage />
                            </div>
                        }
                    />
                    {/* Other Pages */}
                    <Route path="/contact" element={<Contacts />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/UserInfo" element={<UserPage />} />
                </Routes>
            </div>
            </div>
        </ThemeProvider>
    );
}
