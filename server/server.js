const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./Models/db'); // DB connection

const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

const app = express();
const PORT = process.env.PORT || 4000; // default 4000 from your .env

// Middleware
app.use(express.json()); // replaces bodyParser.json()
app.use(cors());

// Routes
app.get('/ping', (req, res) => {
  res.send('PONG');
});
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
