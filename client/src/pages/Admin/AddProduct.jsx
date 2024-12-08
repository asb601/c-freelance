import React, { useState } from "react";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "", // Changed from categoryId to category
    stock: "",
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Get new files
    const updatedFiles = [...formData.images, ...files]; // Append new files to existing ones
    setFormData({ ...formData, images: updatedFiles });
  
    // Generate previews for all images (new + existing)
    const previews = updatedFiles.map((file) => 
      file instanceof File ? URL.createObjectURL(file) : file // Handle both existing previews and new files
    );
    setImagePreviews(previews);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("price", formData.price);
    productData.append("category", formData.category); // Category as string
    productData.append("stock", formData.stock);

    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((file) => {
        productData.append("images", file);
      });
    }

    try {
      const response = await fetch("http://localhost:3000/api/products/products", {
        method: "POST",
        body: productData,
      });

      if (response.ok) {
        alert("Product added successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          images: [],
        });
        setImagePreviews([]);
      } else {
        const errorResponse = await response.json();
        alert(`Failed to add product: ${errorResponse.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Add Product
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Product Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-900">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-900">
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              required
              value={formData.category}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., Bat, Kit, Jersey"
            />
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-900">
              Stock
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              required
              value={formData.stock}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Images */}
          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-900">
              Images
            </label>
            <input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Image Previews */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Image Previews:</h3>
            <div className="grid grid-cols-4 gap-2">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="h-20 w-20 object-cover border border-gray-300 rounded-md"
                />
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
