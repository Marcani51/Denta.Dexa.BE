import express from 'express'
import { UserRoute } from "../routes/user/user.routes";
import { RoleRoute } from '../routes/role/role.routes';
import { auth } from '../middleware';
const api = express.Router()

api.use('/user',auth ,UserRoute)
api.use('/role', auth,RoleRoute)

export const api_v1= api