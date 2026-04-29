require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');
const leadRoutes = require('./routes/lead.routes');

const app = express();

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Root
app.get('/', (req, res) => {
  res.send('API Running...');
});

// Routes
app.use('/api', leadRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});