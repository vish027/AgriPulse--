import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SellerLogin = ({ setIsSeller }) => {
    const { axios } = useAppContext();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Auto-redirect if seller is already logged in
    useEffect(() => {
        // NOTE: This relies on a token being stored in Local Storage.
        // The primary authentication should be the HttpOnly cookie set by the server.
        const sellerToken = localStorage.getItem("sellerToken");
        if (sellerToken) {
            setIsSeller(true);
            navigate("/seller"); // go directly to AddProduct
        }
    }, [navigate, setIsSeller]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/seller/login`,
                { email, password },
                { withCredentials: true } // CRITICAL: Sends/Receives cookies
            );

            if (data.success) {
                // Assuming your backend sets the secure HttpOnly cookie here
                // and optionally returns a token for Local Storage fallback/usage
                if (data.token) {
                    localStorage.setItem("sellerToken", data.token);
                }
                
                setIsSeller(true);
                navigate("/seller");
                toast.success(data.message || "Login successful");
            } else {
                // Server returned an error message (e.g., "User not found")
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login Error:", error);
            // Handle HTTP error responses
            if (error.response?.status === 401 || error.response?.status === 403) {
                 toast.error("Invalid email or password.");
            } else {
                 toast.error(error.response?.data?.message || "Login failed. Check network/server.");
            }
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