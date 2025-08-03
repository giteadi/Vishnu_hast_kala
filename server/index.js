const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { db, testConnection } = require('./config/db'); // ✅ using new function

// Import models (if needed for custom init functions)
const User = require('./models/user');
const Product = require('./models/product');
// etc...

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', require('./routes/user'));
app.use('/api/products', require('./routes/product'));
// ... other routes

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Vishnu Hast Kala API' });
});

app.get('/api/test', (req, res) => {
  res.json({
    message: 'API is working correctly',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
});

app.use(require('./middleware/error').notFound);
app.use(require('./middleware/error').errorHandler);

// Start server after DB init
async function startServer() {
  try {
    await testConnection(); // ✅ test + init DB
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Server failed to start:', err.message);
    process.exit(1);
  }
}

startServer();
