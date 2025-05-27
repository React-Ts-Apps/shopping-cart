import express, { json } from 'express';
import cors from 'cors';

import itemsRoute from './routes/userItemRoute.js';
import adminProductListRoute from './routes/adminItemsRoute.js';
import authRoute from './routes/authRoutes.js';
import connectDB from './config/db.js';
import 'dotenv/config'

const FRONTEND_URL = process.env.FRONTEND_URL


const app = express();
connectDB()

// Enable CORS for all origins
app.use(cors({ origin: FRONTEND_URL }));
app.use(json())

app.use('/home', itemsRoute);
app.use('/admin', adminProductListRoute)
app.use('/auth', authRoute)


export default app;
