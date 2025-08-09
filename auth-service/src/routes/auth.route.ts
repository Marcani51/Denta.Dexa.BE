import express from 'express'
import * as AuthFunction from './auth.controller'

const authRoute=express.Router()

authRoute.post("/", AuthFunction.login)
export const AuthRoute= authRoute