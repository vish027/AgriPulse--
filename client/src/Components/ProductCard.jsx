import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          navigate(
            `/products/${product.category.toLowerCase()}/${product._id}`
          );
          scrollTo(0, 0);
        }}
        className="group relative bg-white border border-black rounded-xl 
                   shadow-md hover:shadow-xl transition-all duration-300 
                   overflow-hidden cursor-pointer w-full max-w-60"
      >
        {/* Product Image */}
        <div className="flex items-center justify-center bg-gray-50 relative">
          <img
            className="group-hover:scale-105 transition-transform duration-300 max-h-40 object-contain p-3"
            src={product.image[0]}
            alt={product.name}
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-xs uppercase tracking-wide text-gray-400">
            {product.category}
          </p>
          <h3 className="text-gray-800 font-semibold text-lg truncate">
            {product.name}
          </h3>

          {/* Ratings */}
          <div className="flex items-center gap-1 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="w-4 h-4"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="rating"
                />
              ))}
            <span className="text-gray-500 text-sm ml-1">(4)</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mt-3">
            <p className="text-lg font-bold text-primary">
              {currency}
              {product.offerPrice}{" "}
              <span className="text-gray-400 text-sm line-through ml-1">
                {currency}
                {product.price}
              </span>
            </p>

            {/* Cart Button */}
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center gap-1 bg-blue-600 
                             text-white text-sm px-3 py-1.5 rounded-lg shadow 
                             hover:bg-blue-700 transition-all"
                  onClick={() => addToCart(product._id)}
                >
                  <img src={assets.cart_icon} alt="cart_icon" className="w-4" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-between gap-2 w-[90px] h-[36px] bg-blue-50 border border-blue-400 rounded-lg">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="w-6 h-full flex items-center justify-center text-lg text-blue-600 font-bold"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="w-6 h-full flex items-center justify-center text-lg text-blue-600 font-bold"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
