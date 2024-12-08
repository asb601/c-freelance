import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Welcome to Admin Home
      </h1>
      <div className="space-y-4">
        {/* Add Product Button */}
        <button
          onClick={() => navigate("/admin/add-product")}
          className="px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Add Product
        </button>

        {/* Dashboard Button */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}
