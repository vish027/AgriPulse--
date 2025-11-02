import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

export default function OrderPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!address.fullName || !address.phone || !address.city) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      // POST request to backend
      const res = await axios.post("http://localhost:4000/api/address", {
        address,
        payment,
        cart,
      });

      if (res.status === 200) {
        alert("🎉 Order placed successfully!");
        clearCart();
        navigate("/");
      }
    } catch (err) {
      console.error("❌ Error placing order:", err);
      alert("Failed to place order. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
          🧾 Order Summary
        </h1>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Cart Section */}
          <div className="md:col-span-2 bg-gray-50 rounded-xl p-6 shadow-inner">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Products
            </h2>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty 💤</p>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b py-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        item.image ||
                        item.images?.[0] ||
                        "https://via.placeholder.com/200"
                      }
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ₹{item.offerPrice}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-green-700">
                    ₹{item.offerPrice}
                  </p>
                </div>
              ))
            )}

            {cart.length > 0 && (
              <div className="text-right mt-6">
                <p className="text-lg font-semibold text-green-800">
                  Total: ₹
                  {cart.reduce(
                    (sum, item) => sum + Number(item.offerPrice),
                    0
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Address & Payment */}
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                🏠 Shipping Address
              </h2>
              <div className="space-y-3">
                {[
                  { name: "fullName", label: "Full Name" },
                  { name: "phone", label: "Phone Number" },
                  { name: "street", label: "Street Address" },
                  { name: "city", label: "City" },
                  { name: "state", label: "State" },
                  { name: "pincode", label: "Pincode" },
                ].map((field) => (
                  <input
                    key={field.name}
                    type="text"
                    name={field.name}
                    value={address[field.name]}
                    onChange={handleAddressChange}
                    placeholder={field.label}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-500"
                  />
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                💳 Payment Method
              </h2>
              <div className="space-y-3">
                {["cod", "card", "upi"].map((method) => (
                  <label key={method} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={payment === method}
                      onChange={(e) => setPayment(e.target.value)}
                    />
                    <span>
                      {method === "cod"
                        ? "Cash on Delivery"
                        : method === "card"
                        ? "Credit / Debit Card"
                        : "UPI / Google Pay"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
            >
              {loading ? "Placing Order..." : "✅ Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
