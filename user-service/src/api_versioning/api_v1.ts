import express from 'express'
import { UserRoute } from "../routes/user/user.routes";
import { RoleRoute } from '../routes/role/role.routes';
const api = express.Router()

api.use('/user', UserRoute)
api.use('/role', RoleRoute)

export const api_v1= api