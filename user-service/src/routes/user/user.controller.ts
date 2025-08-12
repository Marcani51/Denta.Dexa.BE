import { Response, Request, NextFunction } from "express";

import { getPagination } from "../../utilities/query";
import * as userFunction from "../../models/user/user.model";
import { errorHandling } from "../../utilities/commonfunction";

const editRequireMentCheck = async (userId, req, res) => {
  if (!userId) {
    return res.status(400).json({
      error: "ID must be included",
    });
  }

  const isExist = await userFunction.getUserById(userId);
  return isExist;
};

export const httpAddNewUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    await userFunction.saveUser(user);
    return res.status(200).json(user);
  } catch (err) {
    errorHandling(err, req, res);
  }
};

export const httpGetAllUser = async (req: Request, res: Response) => {
  try {
    const { skip, limit } = getPagination(req.query);
    if (req.query.search != undefined) {
      return res.status(200).json(req.query.search);
    } else {
      const user = await userFunction.getAllUser(skip, limit);
      return res.status(200).json(user);
    }
  } catch (err) {
    errorHandling(err, req, res);
  }
};

export const httpUpdateUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const userId = req.params.id;

    const isExist = await editRequireMentCheck(userId, req, res);
    if (!isExist) return res.status(404).json({ message: "User not found" });

    const updateData: any = {
      ...user,
      updateDate: new Date(),
    };

    if (req.body.details) {
      updateData.detail = {
        update: {
          ...user.detail,
          updateDate: new Date(),
        },
      };
    }

    const update = await userFunction.updateUser(updateData, userId);

    return res.status(200).json(update);
  } catch (err) {
    errorHandling(err, req, res);
  }
};

export const httpDeleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const isExist = await editRequireMentCheck(userId, req, res);
    if (!isExist) return res.status(404).json({ message: "User not found" });

    const deleteData = {
      username: isExist.username,
      password: isExist.password,
      email: isExist.email,
      roleId: isExist.roleId,
      detailId: isExist.detailId,
      createdDate: isExist.createdDate,
      createdBy: isExist.createdBy,
      updateBy: isExist.updateBy,
      updateDate: new Date(),
      isActive: false,
    };
    
    const deleteDb = await userFunction.updateUser(deleteData, userId);
    return res.status(200).json(deleteDb);
  } catch (err) {
    errorHandling(err, req, res);
  }
};

export const httpGetUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const userIsEsist = await userFunction.getUserById(userId);
  if (!userIsEsist) return res.status(404).json({ message: "User not found" });
  else return res.status(200).json(userIsEsist);
};
