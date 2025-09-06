const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URL;

// Middleware
app.use(express.json());
app.use(cors())
// Routes
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
app.use('/api', authRoutes);
app.use('/api', todoRoutes);

// MongoDB connection
mongoose.connect(MONGO_URI).then(() => {
  console.log('MongoDB connection successful');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
