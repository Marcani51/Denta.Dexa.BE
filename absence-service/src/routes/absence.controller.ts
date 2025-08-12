import { Response, Request, NextFunction } from "express";

import { PrismaClient } from "../../../generated/prisma";
const prisma = new PrismaClient();

export const httpAddNewAbsence = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File foto wajib diupload" });
    }
    if (!req.body.userId) {
      return res.status(400).json({ error: "userId wajib diisi" });
    }

    const userId = String(req.body.userId);

    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    const photoUrl = `/uploads/${req.file.filename}`;

    const absence = await prisma.absence.create({
      data: {
        userId,
        photoUrl,
        updateDate: new Date(),
        createdDate: new Date(),
      },
    });

    res.status(201).json({
      message: "Absence created successfully",
      data: absence,
    });
  } catch (error) {
    console.error("Prisma error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const httpGetAllWithUser = async (req: Request, res: Response) => {
  try {
    if (req.params.id == undefined)
      return res.status(400).json({ message: "user id must included" });
    const userId = String(req.params.id);

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
      include: { detail: true },
    });
    if (!userExists) {
      return res.status(404).json({ error: "User not exist" });
    }
    const absence = await prisma.absence.findMany({
      where: { userId: userId },
    });
    return res.status(200).json({
      absence: absence,
      user: userExists,
    });
  } catch (err) {
    console.log(err);
  }
};

export const httpGetAllAbsense = async (req: Request, res: Response) => {
  try {
const absence = await prisma.absence.findMany({
  include: {
    user: {
      include: {
        detail: true,
      },
    },
  },
});

    return res.status(200).json(absence);
  } catch (err) {
    console.log(err)
  }
};
