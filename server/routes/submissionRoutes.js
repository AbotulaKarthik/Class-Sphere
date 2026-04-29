import express from 'express'
import { authStudent } from '../middlewares/authStudent.js'
import upload from '../middlewares/upload.js'
import { submitAssignment } from '../controllers/submissionController.js'


const submissionRouter = express.Router()

submissionRouter.post('/submit',authStudent,upload.single("submissionFile"),submitAssignment)

export default submissionRouter