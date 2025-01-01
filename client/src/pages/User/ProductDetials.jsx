import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useTheme } from "../../components/ThemeContext";

const ProductDetailsPage = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cartStatus, setCartStatus] = useState("idle");

  useEffect(() => {
    const fetchProductById = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/products/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductById();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    setCartStatus("loading");
    try {
      const response = await fetch("http://localhost:3000/api/products/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product to cart");
      }

      setCartStatus("success");
      setTimeout(() => setCartStatus("idle"), 2000);
    } catch (err) {
      setError(err.message);
      setCartStatus("error");
      setTimeout(() => setCartStatus("idle"), 3000);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      }`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen p-4 flex items-center justify-center ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      }`}>
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 max-w-md w-full">
          <h3 className="text-red-500 font-semibold">Error</h3>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen p-4 flex items-center justify-center ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      }`}>
        <div className={`${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border rounded-lg p-4 max-w-md w-full`}>
          <h3 className={`${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
          } font-semibold`}>Not Found</h3>
          <p className={`${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>This product could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-6 px-4 sm:px-6 lg:px-8 ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className={`max-w-5xl mx-auto ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      } rounded-xl shadow-2xl overflow-hidden`}>
        <div className="p-6">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className={`aspect-square rounded-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
              } overflow-hidden`}>
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No image available
                  </div>
                )}
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`relative aspect-square rounded-md overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all
                        ${selectedImage === img ? 'ring-2 ring-blue-500' : `ring-1 ${
                          theme === 'dark' ? 'ring-gray-700' : 'ring-gray-200'
                        }`}`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="mt-6 lg:mt-0 flex flex-col h-full">
              <div className="flex-grow">
                <h1 className={`text-2xl font-bold sm:text-3xl mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {product.name}
                </h1>
                
                <div className="flex items-baseline mt-2 mb-4">
                  <span className="text-2xl font-bold text-blue-500">
                    ${product.price}
                  </span>
                </div>

                {product.category?.name && (
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-500/10 text-blue-500">
                      {product.category.name}
                    </span>
                  </div>
                )}

                <div className="prose max-w-none">
                  <p className={`text-base leading-relaxed ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {product.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center space-x-4 text-sm">
                  <div className={`flex items-center ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </div>
                </div>
              </div>

              <div className={`mt-6 pt-6 border-t ${
                theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
              }`}>
                <button
                  onClick={handleAddToCart}
                  disabled={cartStatus === "loading" || product.stock === 0}
                  className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-base font-semibold transition-all
                    ${cartStatus === "loading" 
                      ? 'bg-gray-700 cursor-not-allowed'
                      : cartStatus === "success"
                      ? 'bg-green-500 hover:bg-green-600'
                      : product.stock === 0
                      ? 'bg-gray-700 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                >
                  {cartStatus === "loading" ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : cartStatus === "success" ? (
                    "Added to Cart!"
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailsPage