import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";  // ✅ import here
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { setIsSeller, axios } = useAppContext();
  const navigate = useNavigate();   // ✅ get navigate function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/seller/login`,
        { email, password },
        { withCredentials: true }
      );

      console.log("Backend response:", data);

      if (data.success) {
        setIsSeller(true);
        localStorage.setItem("sellerToken", data.token);
        navigate("/seller");  // ✅ works now
        toast.success(data.message || "Login successful");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.response || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center text-sm text-gray-600"
    >
      <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">Seller</span> Login
        </p>

        {/* Email Input */}
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            required
          />
        </div>

        {/* Password Input */}
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md cursor-pointer"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default SellerLogin;
