import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import soilRoutes from "./Routes/soilRoutes.js";
import AuthRouter from "./Routes/AuthRouter.js";
import predictionRoutes from "./Routes/predictionRoutes.js";
import ProductRouter from "./Routes/ProductRouter.js";
import addressRouter from "./Routes/AddressRouter.js";

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize app
const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Needed for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173", // your Vite frontend
    credentials: true, // ✅ allow cookies & auth headers
  })
);
app.use(express.json());
app.use(cookieParser());

// ✅ Serve static folders
app.use("/uploads", express.static("uploads"));
app.use("/images", express.static(path.join(__dirname, "public/images")));

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Simple test route
app.get("/ping", (req, res) => res.send("PONG"));

// ✅ Crop data API
app.get("/api/crops", (req, res) => {
  const cropData = [
    {
      name: "Rice",
      image: "/images/rice.jpg",
      idealConditions: {
        nitrogen: { min: 60, max: 120 },
        phosphorus: { min: 20, max: 60 },
        potassium: { min: 30, max: 70 },
        ph: { min: 5.0, max: 6.5 },
        rainfall: { min: 1000, max: 2500 },
        temperature: { min: 20, max: 35 },
      },
    },
    // ... other crops unchanged ...
  ];
  res.json(cropData);
});

// ✅ API Routes
app.use("/api/soil", soilRoutes);
app.use("/auth", AuthRouter);
app.use("/api", predictionRoutes);
app.use("/api/products", ProductRouter);
app.use("/api/address", addressRouter);

// ✅ Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "Server is running 🚀",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// ✅ Handle undefined routes (optional but helpful)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
