import express, { json } from 'express';
import cors from 'cors';
import productsRoute from './routes/productsRoute.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import connectDB from './config/db.js';
import 'dotenv/config';
import errorMiddleware from './middlewares/error.js';
import qs from 'qs'
import cookieParser from 'cookie-parser';
const FRONTEND_URL = process.env.FRONTEND_URL
import path from 'path';
import { fileURLToPath } from 'url';

// 👇 Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

//Use express parser instead of Node default one
app.set('query parser', str => qs.parse(str))
connectDB()

// Enable CORS for all origins
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(json())
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/v1', productsRoute)
app.use('/api/v1', authRoutes)
app.use('/api/v1', orderRoutes)
app.use(errorMiddleware)


export default app;
