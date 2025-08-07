import { Response, Request, NextFunction } from "express";

let users = [];

export const httpGetUser = async (req: Request, res: Response) => {
  res.json({
    error: "User Doesn't exist",
  });
};

export const httpCreateUser = async (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.status(201).json(user);
};
