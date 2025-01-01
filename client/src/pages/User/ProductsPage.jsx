import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from 'lucide-react';
import { useTheme } from "../../components/ThemeContext";
import axios from 'axios';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const { theme } = useTheme();

  const categoryMap = {
    "All": "All",
    "Cricket Bat": "bat",
    "Kit": "kit",
    "Jersey": "jersey"
  };

  // Fetch products with axios
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/products/products", {
          withCredentials: true,
        });
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedFilter === "All"
      ? products
      : products.filter((product) => product.category?.name === categoryMap[selectedFilter]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-8">All Products</h1>

        {/* Filter Options */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.keys(categoryMap).map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedFilter === category
                  ? 'bg-blue-600 text-white'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center py-20">
            {error}
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className={`rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <div className="relative aspect-w-1 aspect-h-1">
                  <img
                    src={product.images?.[0] || "/api/placeholder/400/400"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.isNew && (
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                      NEW
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-blue-500">${product.price}</p>
                    <button className={`p-2 rounded-full transition-colors ${
                      theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
                    }`}>
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                  {product.category && (
                    <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {product.category.name}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
