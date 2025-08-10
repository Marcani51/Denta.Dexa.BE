import express from "express";
import cors from 'cors'
import { api_v1 } from "./api_versioning/api_v1";
import doteenv from "dotenv";

const app = express();
doteenv.config();

app.use(
    cors({
      origin: "http://localhost:5173"
      //origin:"https://kost-puce.vercel.app"
    })
  );
app.use(express.json());
app.use("/v1", api_v1);

export const App = app