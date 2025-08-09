import { loginValidation } from "../models/auth.schema";
import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";

import { PrismaClient } from "../../../generated/prisma";
const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  console.log(req.body);

  const { error } = loginValidation(req.body.value);
  if (error)
    return res.status(400).json({
      message: error,
    });

  const userDb = await prisma.user.findFirst({
    where: {
      AND: [{ username: req.body.username }, { password: req.body.password }],
    },
  });

  if (!userDb)
    return res.status(401).json({
      data: "Username and Password incorrect",
      code: 401,
    });

  if (!userDb.isActive)
    return res.status(401).json({
      data: "Account is not actived, contact your admin",
      code: 401,
    });

  try {
    const token = jwt.sign(
      { user: { id: userDb.id } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 100000 }
    );
    res.status(200).json({ token: token, data: userDb });
  } catch (er) {
    res.status(400).send({ message: error });
  }
};
