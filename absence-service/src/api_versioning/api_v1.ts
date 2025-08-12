import express from 'express'
import { AbsenceRoute } from '../routes/absence.route'

const api = express.Router()
api.use('/absence',AbsenceRoute)

export const api_v1=api