import express from 'express'
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet"
import dotenv from 'dotenv'; 
import reteLimit from "express-rate-limit"
import path from "path"
import { api_v1 } from './api_versioning/api_v1';

const app = express()
dotenv.config({ path: path.resolve(__dirname, '.env') })
app.use(
    cors({
      origin: process.env.CORS
      //origin:"https://kost-puce.vercel.app"
    })
  );
app.use(helmet())

const limiter=reteLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

app.use(limiter)

app.use(morgan("combined"));

app.use(express.json());

app.use('/v1',api_v1);

export const App=app;