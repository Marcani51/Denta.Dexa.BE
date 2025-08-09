import { Response, Request, NextFunction } from "express";
import { getPagination } from "../../utilities/query";
import { errorHandling } from "../../utilities/commonfunction";
import * as roleFunction from "../../models/role/index";

const editRequireMentCheck = async (roleId, res) => {
  if (!roleId) {
    return res.status(400).json({
      error: "ID must be included",
    });
  }
  const isExist = await roleFunction.getRoleById(roleId);
  return isExist;
};
export const httpAddNewRole = async (req: Request, res: Response) => {
  try {
    const role = req.body;
    await roleFunction.saveRole(role);
    return res.status(200).json(role);
  } catch (err) {
    errorHandling(err, req, res);
  }
};

export const httpGetAllRole = async (req: Request, res: Response) => {
  try {
    const { skip, limit } = getPagination(req.query);
    if (req.query.search != undefined) {
      /// param search
      console.log("MASUK KOK");
      return res.status(200).json(req.query.search);
    } else {
      const role = await roleFunction.getAllRole(skip, limit);
      return res.status(200).json(role);
    }
  } catch (er) {
    errorHandling(er, req, res);
  }
};

export const httpGetRoleById = async (req: Request, res: Response) => {
  try {
    const roleId = req.params.id;

    const isRoleExist = await roleFunction.getRoleById(roleId);
    if (!isRoleExist)
      return res.status(404).json({
        error: "Role doesn exist",
      });
    else res.status(200).json(isRoleExist);
  } catch (er) {
    errorHandling(er, req, res);
  }
};

export const httpUpdateRole = async (req: Request, res: Response) => {
  try {
    const role = req.body;
    const roleId = req.params.id;
    const isExist = await editRequireMentCheck(roleId, res);
    if (!isExist) return res.status(404).json({ message: "role not found" });

    const updateData: any = {
      ...role,
      updateDate: new Date(),
    };

    if (req.body.access) {
      updateData.access = role.access
    }
    
    const update = await roleFunction.updateRole(updateData, roleId);
    return res.status(200).json(update);
  } catch (er) {
    errorHandling(er, req, res);
  }
};
