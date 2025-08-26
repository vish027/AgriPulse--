import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

// Components
import AgricultureWebsite from "./Components/AgricultureWebsite";
import IrrigationInfo from "./Components/IrrigationInfo";
import DroneTechnology from "./Components/DroneTechnology";
import DigitalAgriTech from "./Components/DigitalAgriTech";
import PestManagement from "./Components/PestManagement";
import BioFertilizersPesticides from "./Components/BioFertilizersPesticides";
import PlantDiseases from "./Components/PlantDiseases";
import About from "./Components/About";

import MainBanner from "./Components/MainBanner";
import Categories from "./Components/Categories";
import BestSeller from "./Components/BestSeller";
import BottomBanner from "./Components/BottomBanner";
import NewsLetter from "./Components/NewsLetter";

// Pages
import Login from "./Components/Login";
import Signup from "./Components/SignUp";

import AddAddress from "./pages/AddAddress";
import AllProducts from "./pages/AllProducts";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import MyOrders from "./pages/MyOrders";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";

// Seller Pages
import AddProduct from "./pages/seller/AddProduct";
import Orders from "./pages/seller/Orders";
import ProductList from "./pages/seller/ProductList";
import SellerLayout from "./pages/seller/SellerLayout";

// Context
import { AppContextProvider } from "./context/AppContext";
import SellerLogin from "./Components/seller/SellerLogin";

export default function App() {
  // General user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  // Seller authentication
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const sellerToken = localStorage.getItem("sellerToken");
    if (sellerToken) setIsSeller(true);
  }, []);

  const SellerPrivateRoute = ({ isSeller }) => {
    return isSeller ? <Outlet /> : <Navigate to="/seller/login" />;
  };

  return (
    <AppContextProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Root redirect */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Public Routes */}
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/seller/login" element={<SellerLogin setIsAuthenticated={setIsSeller} />} />

            {/* General User Private Routes */}
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/products" element={<PrivateRoute><AllProducts /></PrivateRoute>} />
            <Route path="/products/:category" element={<PrivateRoute><ProductCategory /></PrivateRoute>} />
            <Route path="/products/:category/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path="/add-address" element={<PrivateRoute><AddAddress /></PrivateRoute>} />
            <Route path="/my-orders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />

            <Route path="/agriculture-website" element={<PrivateRoute><AgricultureWebsite /></PrivateRoute>} />
            <Route path="/irrigation" element={<PrivateRoute><IrrigationInfo /></PrivateRoute>} />
            <Route path="/drone-technology" element={<PrivateRoute><DroneTechnology /></PrivateRoute>} />
            <Route path="/digital-agri-tech" element={<PrivateRoute><DigitalAgriTech /></PrivateRoute>} />
            <Route path="/pest-mgt" element={<PrivateRoute><PestManagement /></PrivateRoute>} />
            <Route path="/bio-fertilizers-and-pesticides" element={<PrivateRoute><BioFertilizersPesticides /></PrivateRoute>} />
            <Route path="/diseases-of-plants" element={<PrivateRoute><PlantDiseases /></PrivateRoute>} />
            <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />

            <Route path="/main-banner" element={<PrivateRoute><MainBanner /></PrivateRoute>} />
            <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
            <Route path="/best-seller" element={<PrivateRoute><BestSeller /></PrivateRoute>} />
            <Route path="/bottom-banner" element={<PrivateRoute><BottomBanner /></PrivateRoute>} />
            <Route path="/newsletter" element={<PrivateRoute><NewsLetter /></PrivateRoute>} />

            {/* Seller Routes */}
            <Route path="/seller" element={<SellerPrivateRoute isSeller={isSeller} />}>
              <Route index element={<SellerLayout><AddProduct /></SellerLayout>} />
              <Route path="product-list" element={<SellerLayout><ProductList /></SellerLayout>} />
              <Route path="orders" element={<SellerLayout><Orders /></SellerLayout>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AppContextProvider>
  );
}
