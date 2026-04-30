require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
const leadRoutes = require('./routes/lead.routes');

const app = express();

connectDB();
connectRedis();

app.use(rateLimit({ windowMs: 60000, max: 100 }));

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', leadRoutes);

app.listen(5000, () => {
  console.log(' Server running on port 5000');
});