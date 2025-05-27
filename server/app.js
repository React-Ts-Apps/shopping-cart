const express = require('express');
const cors = require('cors');

const itemsRoute = require('./routes/userItemRoute');
const adminProductListRoute = require('./routes/adminItemsRoute')
const authRoute = require('./routes/authRoutes')


require('dotenv').config()

const FRONTEND_URL = process.env.FRONTEND_URL

const connectDB = require('./config/db')
const app = express();
connectDB()

// Enable CORS for all origins
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json())

app.use('/items', itemsRoute);
app.use('/admin/items', adminProductListRoute)
app.use('/signup', authRoute)

module.exports = app;
