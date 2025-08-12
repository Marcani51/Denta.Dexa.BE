import express from 'express'
import * as AbsenceFunction from './absence.controller'
import multer from "multer";
import path from "path";

const absenceRoute=express.Router()

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/"); // Folder penyimpanan foto
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

absenceRoute.post("/", upload.single("photo"), AbsenceFunction.httpAddNewAbsence)
            .get("/",AbsenceFunction.httpGetAllAbsense)
absenceRoute.get("/:id",AbsenceFunction.httpGetAllWithUser)

export const AbsenceRoute=absenceRoute