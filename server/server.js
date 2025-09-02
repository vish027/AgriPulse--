// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import soilRoutes from './Routes/soilRoutes.js';
import AuthRouter from './Routes/AuthRouter.js';
import ProductRouter from './Routes/ProductRouter.js';
import predictionRoutes from './Routes/predictionRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Needed for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// MongoDB connection (make sure your .env has MONGODB_URI pointing to auth database)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Ping route
app.get('/ping', (req, res) => res.send('PONG'));

// Crops API
app.get('/api/crops', (req, res) => {
  const cropData = [
    {
      name: "Rice",
      image: "/images/rice.jpg",
      idealConditions: { nitrogen: { min: 60, max: 120 }, phosphorus: { min: 20, max: 60 }, potassium: { min: 30, max: 70 }, ph: { min: 5.0, max: 6.5 }, rainfall: { min: 1000, max: 2500 }, temperature: { min: 20, max: 35 } }
    },
    {
      name: "Wheat",
      image: "/images/wheat.jpg",
      idealConditions: { nitrogen: { min: 50, max: 100 }, phosphorus: { min: 30, max: 70 }, potassium: { min: 40, max: 80 }, ph: { min: 6.0, max: 7.5 }, rainfall: { min: 500, max: 1000 }, temperature: { min: 10, max: 25 } }
    },
    {
      name: "Sugarcane",
      image: "/images/sugarcane.jpg",
      idealConditions: { nitrogen: { min: 80, max: 200 }, phosphorus: { min: 40, max: 100 }, potassium: { min: 100, max: 250 }, ph: { min: 6.0, max: 7.5 }, rainfall: { min: 1500, max: 2500 }, temperature: { min: 20, max: 35 } }
    },
    {
      name: "Jute",
      image: "/images/jute.jpg",
      idealConditions: { nitrogen: { min: 40, max: 80 }, phosphorus: { min: 20, max: 50 }, potassium: { min: 30, max: 70 }, ph: { min: 6.0, max: 7.5 }, rainfall: { min: 1500, max: 2500 }, temperature: { min: 24, max: 37 } }
    },
    {
    name: "Maize",
    image: "/images/maize.jpg",
    idealConditions: { nitrogen: { min: 70, max: 150 }, phosphorus: { min: 30, max: 80 }, potassium: { min: 50, max: 100 }, ph: { min: 5.8, max: 7.0 }, rainfall: { min: 600, max: 1200 }, temperature: { min: 15, max: 30 } },
  },
  {
    name: "Tea",
    image: "/images/tea.jpg",
    idealConditions: { nitrogen: { min: 50, max: 100 }, phosphorus: { min: 20, max: 50 }, potassium: { min: 40, max: 80 }, ph: { min: 4.5, max: 5.5 }, rainfall: { min: 1500, max: 3000 }, temperature: { min: 15, max: 30 } },
  },
  {
    name: "Coffee",
    image: "/images/coffee.jpg",
    idealConditions: { nitrogen: { min: 40, max: 80 }, phosphorus: { min: 20, max: 40 }, potassium: { min: 30, max: 60 }, ph: { min: 6.0, max: 6.5 }, rainfall: { min: 1500, max: 2500 }, temperature: { min: 15, max: 28 } },
  },
  {
    name: "Cotton",
    image:"/images/cotton.jpg",
    idealConditions: { nitrogen: { min: 60, max: 120 }, phosphorus: { min: 25, max: 60 }, potassium: { min: 50, max: 100 }, ph: { min: 5.5, max: 8.5 }, rainfall: { min: 500, max: 1000 }, temperature: { min: 21, max: 37 } },
  },
  {
    name: "Pulses",
    image: "/images/pulses.jpg",
    idealConditions: { nitrogen: { min: 20, max: 50 }, phosphorus: { min: 20, max: 50 }, potassium: { min: 20, max: 60 }, ph: { min: 6.0, max: 7.5 }, rainfall: { min: 400, max: 800 }, temperature: { min: 15, max: 30 } },
  },
  {
    name: "Barley",
    image: "/images/barley.jpg",
    idealConditions: { nitrogen: { min: 40, max: 80 }, phosphorus: { min: 20, max: 50 }, potassium: { min: 30, max: 60 }, ph: { min: 6.0, max: 7.0 }, rainfall: { min: 300, max: 800 }, temperature: { min: 10, max: 25 } },
  },
  {
    name: "Millets",
    image:"/images/millets.jpg",
    idealConditions: { nitrogen: { min: 30, max: 70 }, phosphorus: { min: 15, max: 40 }, potassium: { min: 20, max: 50 }, ph: { min: 5.5, max: 7.5 }, rainfall: { min: 300, max: 900 }, temperature: { min: 20, max: 35 } },
  },
  {
    name: "Sorghum",
    image: "/images/sorghum.jpg",
    idealConditions: { nitrogen: { min: 30, max: 70 }, phosphorus: { min: 15, max: 40 }, potassium: { min: 20, max: 50 }, ph: { min: 5.5, max: 7.5 }, rainfall: { min: 400, max: 1000 }, temperature: { min: 25, max: 35 } },
  },
  {
    name: "Ragi",
    image: "/images/ragi.jpg",
    idealConditions: { nitrogen: { min: 25, max: 60 }, phosphorus: { min: 15, max: 40 }, potassium: { min: 20, max: 50 }, ph: { min: 5.0, max: 7.0 }, rainfall: { min: 400, max: 900 }, temperature: { min: 20, max: 35 } },
  },
  {
    name: "Peanuts",
    image: "/images/peanuts.jpg",
    idealConditions: { nitrogen: { min: 30, max: 60 }, phosphorus: { min: 20, max: 50 }, potassium: { min: 30, max: 60 }, ph: { min: 5.5, max: 6.5 }, rainfall: { min: 500, max: 1000 }, temperature: { min: 20, max: 32 } },
  },
  {
    name: "Sunflower",
    image:"/images/sunflower.jpg",
    idealConditions: { nitrogen: { min: 40, max: 80 }, phosphorus: { min: 20, max: 50 }, potassium: { min: 40, max: 80 }, ph: { min: 6.0, max: 7.5 }, rainfall: { min: 400, max: 1000 }, temperature: { min: 20, max: 30 } },
  },
  {
    name: "Mustard",
    image:"/images/mustard.jpg",
    idealConditions: { nitrogen: { min: 30, max: 60 }, phosphorus: { min: 20, max: 50 }, potassium: { min: 30, max: 60 }, ph: { min: 6.0, max: 7.5 }, rainfall: { min: 400, max: 800 }, temperature: { min: 15, max: 30 } },
  },
  {
    name: "Soybean",
    image: "/images/soyabean.jpg",
    idealConditions: { nitrogen: { min: 40, max: 80 }, phosphorus: { min: 20, max: 50 }, potassium: { min: 40, max: 80 }, ph: { min: 6.0, max: 7.5 }, rainfall: { min: 500, max: 1200 }, temperature: { min: 20, max: 30 } },
  },
  {
    name: "Green Gram",
    image: "/images/greengram.jpg",
    idealConditions: { nitrogen: { min: 20, max: 50 }, phosphorus: { min: 20, max: 50 }, potassium: { min: 20, max: 60 }, ph: { min: 6.0, max: 7.5 }, rainfall: { min: 400, max: 900 }, temperature: { min: 25, max: 35 } },
  },
  {
    name: "Black Gram",
    image:"/images/blackgram.jpg",
    idealConditions: { nitrogen: { min: 20, max: 50 }, phosphorus: { min: 20, max: 50 }, potassium: { min: 20, max: 60 }, ph: { min: 6.0, max: 7.5 }, rainfall: { min: 400, max: 900 }, temperature: { min: 25, max: 35 } },
  },
  {
    name: "Mango",
    image:"/images/mango.jpg",
    idealConditions: { nitrogen: { min: 30, max: 60 }, phosphorus: { min: 20, max: 50 }, potassium: { min: 30, max: 60 }, ph: { min: 6.0, max: 7.5 }, rainfall: { min: 400, max: 800 }, temperature: { min: 15, max: 30 } },
  },
  {
    name: "Guava",
    image: "/images/guava.jpg",
    idealConditions: { nitrogen: { min: 25, max: 55 }, phosphorus: { min: 20, max: 50 }, potassium: { min: 20, max: 50 }, ph: { min: 6.0, max: 7.5 }, rainfall: { min: 400, max: 800 }, temperature: { min: 15, max: 30 } },
  },
  {
    name: "Tomato",
    image:"/images/tomato.jpg",
    idealConditions: { nitrogen: { min: 40, max: 80 }, phosphorus: { min: 30, max: 60 }, potassium: { min: 40, max: 80 }, ph: { min: 6.0, max: 6.8 }, rainfall: { min: 500, max: 1200 }, temperature: { min: 18, max: 30 } },
  },
  {
    name: "Potato",
    image:"/images/potato.jpg",
    idealConditions: { nitrogen: { min: 60, max: 120 }, phosphorus: { min: 40, max: 80 }, potassium: { min: 60, max: 120 }, ph: { min: 5.5, max: 6.5 }, rainfall: { min: 500, max: 1200 }, temperature: { min: 15, max: 25 } },
  },
  {
    name: "Onion",
    image: "/images/onion.jpg",
    
    idealConditions: { nitrogen: { min: 40, max: 80 }, phosphorus: { min: 20, max: 50 }, potassium: { min: 30, max: 60 }, ph: { min: 6.0, max: 6.8 }, rainfall: { min: 400, max: 900 }, temperature: { min: 15, max: 25 } },
  },
  {
    name: "Garlic",
    image: "/images/garlic.jpg",
    idealConditions: { nitrogen: { min: 40, max: 80 }, phosphorus: { min: 20, max: 50 }, potassium: { min: 30, max: 60 }, ph: { min: 6.0, max: 6.8 }, rainfall: { min: 400, max: 900 }, temperature: { min: 15, max: 25 } },
  },
  {
    name: "Cabbage",
    image: "/images/cabbage.jpg",
    idealConditions: { nitrogen: { min: 40, max: 80 }, phosphorus: { min: 20, max: 50 }, potassium: { min: 30, max: 60 }, ph: { min: 6.0, max: 7.0 }, rainfall: { min: 400, max: 1000 }, temperature: { min: 15, max: 25 } },
  },
  {
    name: "Cauliflower",
    image: "/images/cauliflower.jpg",
    idealConditions: { nitrogen: { min: 40, max: 80 }, phosphorus: { min: 20, max: 50 }, potassium: { min: 30, max: 60 }, ph: { min: 6.0, max: 7.0 }, rainfall: { min: 400, max: 1000 }, temperature: { min: 15, max: 25 } },
  },
  {
    name: "Brinjal",
    image: "/images/brinjal.jpg",
    idealConditions: { nitrogen: { min: 40, max: 80 }, phosphorus: { min: 20, max: 50 }, potassium: { min: 30, max: 60 }, ph: { min: 6.0, max: 6.8 }, rainfall: { min: 400, max: 1000 }, temperature: { min: 18, max: 30 } },
  }
  ];
  res.json(cropData);
});

// API Routes
app.use('/api/soil', soilRoutes);
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/api', predictionRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running 🚀',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
  });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
