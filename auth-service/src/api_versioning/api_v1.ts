import express from 'express'
import { AuthRoute } from '../routes/auth.route'

const api = express.Router()
api.use('/login',AuthRoute)

export const api_v1=api