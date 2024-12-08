import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import { Link } from "react-router-dom"; // Import Link to enable navigation

const ProductPage = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  // Map UI display names to actual category names in DB
  const categoryMap = {
    "All": "All",
    "Cricket Bat": "bat",
    "Kit": "kit",
    "Jersey": "jersey"
  };

  const [selectedFilter, setSelectedFilter] = useState("All");

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products based on selected filter
  const filteredProducts =
    selectedFilter === "All"
      ? products
      : products.filter((product) => product.category?.name === categoryMap[selectedFilter]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl sm:text-2xl font-bold">All Products</h1>
      </header>
      <main className="p-2 sm:p-6">
        {/* Filter Options */}
        <div className="mb-4 sm:mb-6 flex space-x-2 sm:space-x-4">
          <button
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
              selectedFilter === "All" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedFilter("All")}
          >
            All
          </button>
          <button
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
              selectedFilter === "Cricket Bat" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedFilter("Cricket Bat")}
          >
            Cricket Bat
          </button>
          <button
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
              selectedFilter === "Kit" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedFilter("Kit")}
          >
            Kit
          </button>
          <button
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
              selectedFilter === "Jersey" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedFilter("Jersey")}
          >
            Jerseys
          </button>
        </div>

        {/* Loading and Error States */}
        {loading && <p className="text-sm sm:text-base text-gray-700">Loading products...</p>}
        {error && <p className="text-red-500 text-sm sm:text-base">{error}</p>}

        {/* Check if there are products to display */}
        {!loading && !error && filteredProducts.length === 0 && (
          <p className="text-center text-gray-700 text-sm sm:text-base">No products found.</p>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-md group">
                <div className="relative overflow-hidden">
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                      New
                    </span>
                  )}
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : "https://via.placeholder.com/150"
                    }
                    alt={product.name}
                    className="w-full h-40 object-contain bg-gray-100 transform group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-3 space-y-1">
                  <h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-red-600 text-sm font-semibold">${product.price}</p>
                  {product.category && (
                    <p className="text-gray-600 text-xs">{product.category.name}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
