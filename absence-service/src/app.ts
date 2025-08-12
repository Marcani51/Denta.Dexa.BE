import express from "express";
import cors from 'cors'
import { api_v1 } from "./api_versioning/api_v1";
import dotenv from "dotenv";
import path from "path";

const app = express();
dotenv.config({ path: path.resolve(__dirname, '.env') })

app.use(
    cors({
      origin: process.env.CORS
      //origin:"https://kost-puce.vercel.app"
    })
  );
app.use(express.json());
app.use("/v1", api_v1);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get("/download/:filename", (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.filename);
  res.download(filePath, (err) => {
    if (err) {
      res.status(404).send("File tidak ditemukan");
    }
  });
});

export const App = app