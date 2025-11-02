// src/pages/AddProduct.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    offerPrice: "",
    images: [null, null, null, null],
  });

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle individual image uploads
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const updatedImages = [...formData.images];
    updatedImages[index] = file;
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();

  const allUploaded = formData.images.every((img) => img !== null);
  if (!allUploaded) {
    alert("Please upload all product images before submitting.");
    return;
  }

  const data = new FormData();
  data.append("name", formData.name);
  data.append("description", formData.description);
  data.append("price", formData.price);
  data.append("offerPrice", formData.offerPrice);
  formData.images.forEach((img) => data.append("images", img));

  try {
    const res = await fetch("http://localhost:4000/api/products/add", {
      method: "POST",
      body: data,
    });
    const result = await res.json();

    if (res.ok) {
      alert("✅ Product added successfully!");
      console.log(result.product);
      navigate("/products");
    } else {
      alert(result.message || "❌ Failed to add product");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-8">
          🌾 Add Your Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Images */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              Upload 4 Product Images
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="border-2 border-dashed border-green-300 rounded-xl p-3 text-center relative hover:border-green-500 transition-all duration-300"
                >
                  {formData.images[idx] ? (
                    <img
                      src={URL.createObjectURL(formData.images[idx])}
                      alt={`Product ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-lg shadow-md"
                    />
                  ) : (
                    <label className="text-sm text-gray-500 cursor-pointer flex flex-col items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 mb-1 text-green-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      Upload {idx + 1}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, idx)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Organic Rice"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short product description..."
              required
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          {/* Price Fields */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Offer Price (₹)
              </label>
              <input
                type="number"
                name="offerPrice"
                value={formData.offerPrice}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-md"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
