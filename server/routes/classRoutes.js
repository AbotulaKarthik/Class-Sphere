import express from 'express'
import { createClass, getClassStudents, getFacultyClasses, getStudentClasses, removeStudent, searchClass } from '../controllers/classController.js'
import { authFaculty } from '../middlewares/authFaculty.js'
import { authStudent } from '../middlewares/authStudent.js'

const classRouter = express.Router()

classRouter.post("/create", authFaculty ,createClass)
classRouter.get("/classes",authFaculty,getFacultyClasses)
classRouter.get('/student',authStudent,getStudentClasses)
classRouter.get("/search",authStudent,searchClass)
classRouter.get('/members',authFaculty,getClassStudents)
classRouter.delete('/remove-student',authFaculty,removeStudent)

export default classRouter