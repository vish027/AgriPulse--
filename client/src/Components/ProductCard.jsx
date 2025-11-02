// src/components/ProductCard.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/mycart"); // ✅ Redirect after adding
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-full max-w-sm">
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <img
            src={
              product.images?.length > 0
                ? product.images[0]
                : "https://via.placeholder.com/300x200?text=No+Image"
            }
            alt={product.name}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ₹{product.offerPrice}
            </span>
            <span className="text-sm line-through text-gray-400 ml-2">
              ₹{product.price}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
