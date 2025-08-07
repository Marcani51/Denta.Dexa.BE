import express from 'express'
import * as UserController from './user.controller'

const userRoute= express.Router()

userRoute.get('/', UserController.httpGetUser)
userRoute.post('/',UserController.httpCreateUser)

export const UserRoute=userRoute