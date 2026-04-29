import express from 'express'
import { facultyLogin, isFacultyAuth } from '../controllers/facultyController.js'
import { authFaculty } from '../middlewares/authFaculty.js'

const facultyRouter = express.Router()

facultyRouter.post('/login',facultyLogin)
facultyRouter.get('/is-auth',authFaculty,isFacultyAuth)

export default facultyRouter