// App.jsx
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

// Components
import AgricultureWebsite from "./Components/AgricultureWebsite"; // <- Made Public
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
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import SellerLogin from "./Components/seller/SellerLogin";

// Pages
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

// New pages for Yield Prediction
import HomePage from "./pages/HomePage";
import RecommendationsPage from "./pages/RecommendationsPage";

// Prediction Form Component
import PredictionForm from "./Components/PredictionForm/PredictionForm";
import Smart from "./Components/Smart";

export default function App() {
  // General user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  const PrivateRoute = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };

  // Seller authentication
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const sellerToken = localStorage.getItem("sellerToken");
    if (sellerToken) setIsSeller(true);
  }, []);

  const SellerPrivateRoute = () => {
    return isSeller ? <Outlet /> : <Navigate to="/seller/login" />;
  };

  return (
    <AppContextProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Root Redirect: Now redirects to the Agriculture Website */}
            <Route path="/" element={<Navigate to="/agriculture-website" />} />

            {/* Public Routes */}
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/signup"
              element={<Signup setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/seller/login"
              element={<SellerLogin setIsSeller={setIsSeller} />}
            />

            {/* Public Route for the Landing Page (Agriculture Website) */}
            <Route path="/agriculture-website" element={<AgricultureWebsite />} />
            <Route path="/about" element={<About />} />


            {/* General User Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/products/:category" element={<ProductCategory />} />
              <Route path="/products/:category/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/add-address" element={<AddAddress />} />
              <Route path="/my-orders" element={<MyOrders />} />

              {/* Agriculture Info - Now Private */}
              <Route path="/irrigation" element={<IrrigationInfo />} />
              <Route path="/drone-technology" element={<DroneTechnology />} />
              <Route path="/digital-agri-tech" element={<DigitalAgriTech />} />
              <Route path="/pest-mgt" element={<PestManagement />} />
              <Route
                path="/bio-fertilizers-and-pesticides"
                element={<BioFertilizersPesticides />}
              />
              <Route path="/diseases-of-plants" element={<PlantDiseases />} />

              {/* Banners & Extras - Now Private */}
              <Route path="/main-banner" element={<MainBanner />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/best-seller" element={<BestSeller />} />
              <Route path="/bottom-banner" element={<BottomBanner />} />
              <Route path="/newsletter" element={<NewsLetter />} />

              {/* Crop Yield Prediction - Now Private */}
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/prediction" element={<PredictionForm />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/smart" element={<Smart />} />
            </Route>

            {/* Seller Routes */}
            <Route path="/seller" element={<SellerPrivateRoute />}>
              <Route element={<SellerLayout />}>
                <Route index element={<AddProduct />} />
                <Route path="product-list" element={<ProductList />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Route>

            {/* 404 Page */}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </div>
      </Router>
    </AppContextProvider>
  );
}