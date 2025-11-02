// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

// Contexts
import { AppContextProvider } from "./context/AppContext";
import { CartProvider } from "./context/CartContext";

// 🌾 Agriculture Components
import AgricultureWebsite from "./Components/AgricultureWebsite";
import IrrigationInfo from "./Components/IrrigationInfo";
import DroneTechnology from "./Components/DroneTechnology";
import DigitalAgriTech from "./Components/DigitalAgriTech";
import PestManagement from "./Components/PestManagement";
import BioFertilizersPesticides from "./Components/BioFertilizersPesticides";
import PlantDiseases from "./Components/PlantDiseases";
import About from "./Components/About";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import Smart from "./Components/Smart";

// 🌾 Yield Prediction Pages
import HomePage from "./pages/HomePage";
import RecommendationsPage from "./pages/RecommendationsPage";
import PredictionForm from "./Components/PredictionForm/PredictionForm";

// 🛒 E-commerce Components
import Home from "./Components/Home";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import MyCart from "./pages/MyCart";
import OrderPage from "./pages/OrderPage";

export default function App() {
  // General user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  // Protected route wrapper
  const PrivateRoute = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <AppContextProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Root Redirect */}
              <Route path="/" element={<Navigate to="/agriculture-website" />} />

              {/* 🔓 Public Routes */}
              <Route
                path="/login"
                element={<Login setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route
                path="/signup"
                element={<Signup setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route
                path="/agriculture-website"
                element={<AgricultureWebsite />}
              />
              <Route path="/about" element={<About />} />

              {/* 🛡️ Private Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/irrigation" element={<IrrigationInfo />} />
                <Route path="/drone-technology" element={<DroneTechnology />} />
                <Route
                  path="/digital-agri-tech"
                  element={<DigitalAgriTech />}
                />
                <Route path="/pest-mgt" element={<PestManagement />} />
                <Route
                  path="/bio-fertilizers-and-pesticides"
                  element={<BioFertilizersPesticides />}
                />
                <Route
                  path="/diseases-of-plants"
                  element={<PlantDiseases />}
                />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/prediction" element={<PredictionForm />} />
                <Route
                  path="/recommendations"
                  element={<RecommendationsPage />}
                />
                <Route path="/smart" element={<Smart />} />

                {/* 🛒 E-commerce Routes */}
                <Route path="/shop" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/mycart" element={<MyCart />} />
                <Route path="/order" element={<OrderPage />} />
              </Route>

              {/* 🚫 404 Page */}
              <Route path="*" element={<h2>404 - Page Not Found</h2>} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AppContextProvider>
  );
}
