import express, { json } from 'express';
import cors from 'cors';
import productsRoute from './routes/productsRoute.js';
import connectDB from './config/db.js';
import 'dotenv/config'
import errorMiddleware from './middlewares/error.js';

const FRONTEND_URL = process.env.FRONTEND_URL


const app = express();
connectDB()

// Enable CORS for all origins
app.use(cors({ origin: FRONTEND_URL }));
app.use(json())

app.use('/api/v1', productsRoute)
app.use(errorMiddleware)


export default app;
