import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductById, clearProductDetails } from "../../redux/productSlice";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.productDetails);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearProductDetails());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    alert(`"${product.name}" has been added to your cart!`);
    console.log("Add to Cart:", product.name);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy "${product.name}"!`);
    console.log("Buy Now:", product.name);
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="p-8 text-center text-gray-700">No product found.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto md:grid md:grid-cols-2 md:gap-8">
        {/* Left Section: Main Image & Thumbnails */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="border border-gray-200 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center h-80">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product.name}
                className="object-contain max-h-full max-w-full"
              />
            ) : (
              <span className="text-gray-500">No image</span>
            )}
          </div>

          {/* Thumbnails (if more than one image) */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto py-1">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`border border-gray-300 rounded-md overflow-hidden w-16 h-16 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500
                  ${selectedImage === img ? "ring-2 ring-indigo-500" : ""}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="object-contain bg-gray-100 w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Section: Product Info */}
        <div className="mt-8 md:mt-0 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-xl sm:text-2xl font-semibold text-red-600">${product.price}</p>
          {product.category?.name && (
            <p className="text-sm text-gray-600">Category: {product.category.name}</p>
          )}
          <p className="text-sm text-gray-600">Stock: {product.stock}</p>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-800 leading-relaxed">{product.description}</p>
          </div>

          {/* Buttons Section */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
