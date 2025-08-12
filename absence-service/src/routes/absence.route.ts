import express from 'express'
import * as AbsenceFunction from './absence.controller'
import multer from "multer";
import path from "path";
import fs from 'fs'

const absenceRoute=express.Router()
const uploadsDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Folder uploads berhasil dibuat di:', uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

absenceRoute.post("/", upload.single("photo"), AbsenceFunction.httpAddNewAbsence)
            .get("/",AbsenceFunction.httpGetAllAbsense)
absenceRoute.get("/:id",AbsenceFunction.httpGetAllWithUser)

export const AbsenceRoute=absenceRoute