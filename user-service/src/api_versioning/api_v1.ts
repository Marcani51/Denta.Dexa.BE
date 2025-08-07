import express from 'express'
import { UserRoute } from "../routes/user.routes";

const api = express.Router()

api.use('/user', UserRoute)

export const api_v1= api