import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const MyCart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.offerPrice * item.quantity,
    0
  );

  const handleBuyNow = () => {
    navigate("/order", { state: { products: cart } });
  };

  return (
    <div className="min-h-screen bg-white py-8 px-6 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-8">🛒 My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
            {cart.map((item) => (
              <div
                key={item._id}
                className="border rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 w-72 bg-white flex flex-col items-center"
              >
                <img
                  src={
                    item.image ||
                    (item.images?.length > 0
                      ? item.images[0]
                      : "https://via.placeholder.com/220")
                  }
                  alt={item.name}
                  className="w-48 h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-base font-medium text-gray-800 text-center mb-1">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-500 mb-3 text-center line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-green-600 font-semibold text-sm">
                    ₹{item.offerPrice}
                  </span>
                  <span className="text-gray-400 line-through text-xs">
                    ₹{item.price}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-4">
                  Qty: {item.quantity}
                </p>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-5 rounded-md transition-all"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total + Buy Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <h2 className="text-lg font-semibold">
              Total:{" "}
              <span className="text-green-600 font-bold text-xl">₹{total}</span>
            </h2>
            <div className="flex gap-3">
              <button
                onClick={handleBuyNow}
                className="bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-6 rounded-lg"
              >
                Buy Now
              </button>
              <button
                onClick={clearCart}
                className="bg-gray-300 hover:bg-gray-400 text-sm py-2 px-6 rounded-lg"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyCart;
