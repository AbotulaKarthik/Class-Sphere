import express from 'express'

import { authStudent } from "../middlewares/authStudent.js";
import { authFaculty } from "../middlewares/authFaculty.js";
import { getClassRequests, handleJoinRequest, sendJoinRequest } from '../controllers/joinController.js';

const joinRouter = express.Router()

joinRouter.post('/send',authStudent, sendJoinRequest)
joinRouter.get('/faculty', authFaculty, getClassRequests)
joinRouter.post('/handle',authFaculty, handleJoinRequest)

export default joinRouter