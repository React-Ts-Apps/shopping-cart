const express = require('express');
const cors = require('cors');
const itemsRoutes = require('./routes/items');
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'
const app = express();

// ✅ Enable CORS for all origins
app.use(cors({ origin: FRONTEND_URL }));

app.use('/api/items', itemsRoutes);

module.exports = app;
