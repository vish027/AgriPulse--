import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

// Pages
import Login from "./Components/Login";
import Signup from "./Components/SignUp";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        {/* Handles refresh + authentication */}
        <RefrshHandler setIsAuthenticated={setIsAuthenticated} />

        <Routes>
          {/* Root always shows login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />

          {/* Private Routes */}
          <Route
            path="/agriculture-website"
            element={
              <PrivateRoute>
                <AgricultureWebsite />
              </PrivateRoute>
            }
          />
          <Route
            path="/irrigation"
            element={
              <PrivateRoute>
                <IrrigationInfo />
              </PrivateRoute>
            }
          />
          <Route
            path="/drone-technology"
            element={
              <PrivateRoute>
                <DroneTechnology />
              </PrivateRoute>
            }
          />
          <Route
            path="/digital-agri-tech"
            element={
              <PrivateRoute>
                <DigitalAgriTech />
              </PrivateRoute>
            }
          />
          <Route
            path="/pest-mgt-control"
            element={
              <PrivateRoute>
                <PestManagementControl />
              </PrivateRoute>
            }
          />
          <Route
            path="/bio-fertilizers-and-pesticides"
            element={
              <PrivateRoute>
                <BioFertilizersPesticides />
              </PrivateRoute>
            }
          />
          <Route
            path="/diseases-of-plants"
            element={
              <PrivateRoute>
                <PlantDiseases />
              </PrivateRoute>
            }
          />
          <Route
  path="/about"
  element={
    <PrivateRoute>
      <About />
    </PrivateRoute>
  }
/>
        </Routes>
      </div>
    </Router>
);
}