import express from 'express'
import * as RoleController from './role.controller'
import * as validator from "../../middleware/validator"

const roleRoute= express.Router()

roleRoute
    .get('/', RoleController.httpGetAllRole)
    .post('/',validator.validateRole, RoleController.httpAddNewRole)
roleRoute
    .get('/:id',RoleController.httpGetRoleById)
    .put("/:id", validator.validateRole ,RoleController.httpUpdateRole)
    

export const RoleRoute=roleRoute