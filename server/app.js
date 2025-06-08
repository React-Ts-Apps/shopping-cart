import express, { json } from 'express';
import cors from 'cors';
import productsRoute from './routes/productsRoute.js';
import connectDB from './config/db.js';
import 'dotenv/config'
import errorMiddleware from './middlewares/error.js';
import qs from 'qs'
const FRONTEND_URL = process.env.FRONTEND_URL


const app = express();

//Use express parser instead of Node default one
app.set('query parser', str => qs.parse(str))
connectDB()

// Enable CORS for all origins
app.use(cors({ origin: FRONTEND_URL }));
app.use(json())

app.use('/api/v1', productsRoute)
app.use(errorMiddleware)


export default app;
