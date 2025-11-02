// src/context/AppContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  // ✅ Configure Axios
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // ✅ Fetch Seller Status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/auth/is-auth");
      setIsSeller(data.success || false);
    } catch {
      setIsSeller(false);
    }
  };

  // ✅ Fetch User Info
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/auth/is-auth");
      if (data.success) {
        setUser(data.user || null);
        setCartItems(data.user?.cartItems || {});
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  // ✅ Fetch All Products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products");
      if (data.success) setProducts(data.products || []);
      else toast.error(data.message || "Failed to load products");
    } catch (error) {
      toast.error(error.message || "Failed to load products");
    }
  };

  // ✅ Cart Functions
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      newCart[itemId] = (newCart[itemId] || 0) + 1;
      toast.success("Added to Cart");
      return newCart;
    });
  };

  const updateCartItem = (itemId, quantity) => {
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: quantity };
      toast.success("Cart Updated");
      return newCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId]) {
        newCart[itemId] -= 1;
        if (newCart[itemId] <= 0) delete newCart[itemId];
      }
      toast.success("Removed from Cart");
      return newCart;
    });
  };

  // ✅ Cart Calculations
  const getCartCount = () => Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = products.find((p) => p._id === id);
      if (item) total += item.offerPrice * qty;
      return total;
    }, 0);
  };

  // ✅ Initial Data Fetch
  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  // ✅ Sync Cart (Optional: ensure backend supports /api/cart/update)
  useEffect(() => {
    const updateCartBackend = async () => {
      if (!user) return;
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });
        if (!data.success) toast.error(data.message || "Failed to update cart");
      } catch (error) {
        toast.error(error.message || "Failed to update cart");
      }
    };
    updateCartBackend();
  }, [cartItems, user]);

  // ✅ Provide context values
  const value = {
    user,
    setUser,
    isSeller,
    setIsSeller,
    products,
    currency,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    getCartAmount,
    getCartCount,
    searchQuery,
    setSearchQuery,
    fetchProducts,
    axios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
