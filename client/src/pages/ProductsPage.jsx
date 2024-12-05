import React, { useState } from "react";

const ProductPage = () => {
  const products = [
    {
      id: 1,
      name: "SS Klaasen Magnum Cricket Bat (2025)",
      price: "$149",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
      category: "Cricket Bat",
      isNew: true,
    },
    {
      id: 2,
      name: "SS Klaasen Ranger Cricket Bat (2025)",
      price: "$229",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
      category: "Cricket Bat",
      isNew: true,
    },
    {
      id: 3,
      name: "Cricket Kit Combo",
      price: "$349",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
      category: "Kit",
      isNew: false,
    },
    {
      id: 4,
      name: "Team Jersey (2025 Edition)",
      price: "$99",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
      category: "Jersey",
      isNew: false,
    },
  ];

  const [selectedFilter, setSelectedFilter] = useState("All");

  // Filtered Products
  const filteredProducts =
    selectedFilter === "All"
      ? products
      : products.filter((product) => product.category === selectedFilter);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">All Products</h1>
      </header>
      <main className="p-6">
        {/* Filter Options */}
        <div className="mb-6 flex space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              selectedFilter === "All"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedFilter("All")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedFilter === "Cricket Bat"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedFilter("Cricket Bat")}
          >
            Cricket Bat
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedFilter === "Kit"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedFilter("Kit")}
          >
            Kit
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedFilter === "Jersey"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedFilter("Jersey")}
          >
            Jerseys
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative">
                {product.isNew && (
                  <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    New
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-red-600 text-xl font-semibold">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
