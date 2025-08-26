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

  // Setup axios
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // Fetch seller status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success || false);
    } catch (error) {
      setIsSeller(false);
    }
  };

  // Fetch user info
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user || null);
        setCartItems(data.user?.cartItems || {});
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) setProducts(data.products || []);
      else toast.error(data.message || "Failed to load products");
    } catch (error) {
      toast.error(error.message || "Failed to load products");
    }
  };

  // Cart functions
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

  const getCartCount = () => Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = products.find((p) => p._id === id);
      if (item) total += item.offerPrice * qty;
      return total;
    }, 0);
  };

  // Initial fetch
  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  // Sync cart to backend
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
