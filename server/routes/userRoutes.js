import express from 'express'
import { isAuth, login, logout, register } from '../controllers/userController.js'
import { authStudent } from '../middlewares/authStudent.js'

const userRouter = express.Router()

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/is-auth',authStudent,isAuth)
userRouter.get('/logout',authStudent,logout)

export default userRouter