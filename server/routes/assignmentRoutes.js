import express from 'express'
import { authFaculty } from "../middlewares/authFaculty.js";
import upload from '../middlewares/upload.js';
import { createAssignment, evaluateSubmission, getAssignmentsByClass, getSingleAssignment, getSubmissions, submitAssignment } from '../controllers/assignmentController.js';
import { authStudent } from '../middlewares/authStudent.js';

const assignmentRouter = express.Router()

assignmentRouter.post('/create',authFaculty,upload.single('questionFile'),createAssignment)
assignmentRouter.get('/class',authStudent,getAssignmentsByClass)
assignmentRouter.post('/submit',authStudent,upload.single('answerFile'),submitAssignment)
assignmentRouter.get('/submissions/:classId',authFaculty,getSubmissions)
assignmentRouter.post('/evaluate',authFaculty,evaluateSubmission)
assignmentRouter.get('/:id', authStudent, getSingleAssignment)

export default assignmentRouter