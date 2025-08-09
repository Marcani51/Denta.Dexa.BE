import express from "express";
import * as UserController from "./user.controller";
import * as validator from "../../middleware/validator";
const userRoute = express.Router();

userRoute
    .get('/:id', UserController.httpGetUserById)
    .delete("/:id", UserController.httpDeleteUser)
    .put("/:id", validator.validateUser, UserController.httpUpdateUser);
userRoute
  .get("/", UserController.httpGetAllUser)
  .post("/", validator.validateUser, UserController.httpAddNewUser);

export const UserRoute = userRoute;
