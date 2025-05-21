const express = require('express');
const cors = require('cors');
const itemsRoutes = require('./routes/items');

const app = express();

// ✅ Enable CORS for all origins
app.use(cors());

app.use('/api/items', itemsRoutes);

module.exports = app;
