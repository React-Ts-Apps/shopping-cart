const express = require('express');
const cors = require('cors');
const itemsRoute = require('./routes/userItemRoute');
const adminRoute = require('./routes/adminRoute')
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'
const app = express();

// ✅ Enable CORS for all origins
app.use(cors({ origin: FRONTEND_URL }));

app.use('/items', itemsRoute);
app.use('/admin', adminRoute)

module.exports = app;
