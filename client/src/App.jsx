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

// Context
import { AppContextProvider } from "./context/AppContext";

// Pages for Yield Prediction
import HomePage from "./pages/HomePage";
import RecommendationsPage from "./pages/RecommendationsPage";
import PredictionForm from "./Components/PredictionForm/PredictionForm";

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

  return (
    <AppContextProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Root Redirect */}
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
              path="/agriculture-website"
              element={<AgricultureWebsite />}
            />
            <Route path="/about" element={<About />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/irrigation" element={<IrrigationInfo />} />
              <Route path="/drone-technology" element={<DroneTechnology />} />
              <Route path="/digital-agri-tech" element={<DigitalAgriTech />} />
              <Route path="/pest-mgt" element={<PestManagement />} />
              <Route
                path="/bio-fertilizers-and-pesticides"
                element={<BioFertilizersPesticides />}
              />
              <Route path="/diseases-of-plants" element={<PlantDiseases />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/prediction" element={<PredictionForm />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/smart" element={<Smart />} />
            </Route>

            {/* 404 Page */}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </div>
      </Router>
    </AppContextProvider>
  );
}
