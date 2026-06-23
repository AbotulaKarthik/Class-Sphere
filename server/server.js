import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js'
import userRouter from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import facultyRouter from './routes/facultyRoutes.js'
import classRouter from './routes/classRoutes.js'
import joinRouter from './routes/joinRoutes.js'
import assignmentRouter from './routes/assignmentRoutes.js'
import submissionRouter from './routes/submissionRoutes.js'


const app = express()

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://class-sphere-lyart.vercel.app/'
    ],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/uploads", express.static("uploads"))

connectDb()


app.get('/',(req,res)=>{
    res.send("API Running...")
})

///// student routes ----------------------
app.use('/api/student',userRouter)

///// faculty routes ----------------------
app.use('/api/faculty',facultyRouter)

///// Class routes ------------------------
app.use('/api/class',classRouter)

///// Class request Routes -----------------
app.use('/api/join',joinRouter) 

//// assignment routes --------------------
app.use('/api/assignment',assignmentRouter)

//// submission router ---------------------
app.use('/api/submission',submissionRouter)


const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log("Server running on port "+port)
})