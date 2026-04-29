import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//// Register the student (/api/student/register) ------------------------------
export const register = async (req,res)=>{
    try {
        const {name,regno,email,password} = req.body
        if(!name || !email || !password || !regno) {
            return res.json({success: false, message: "Missing Details"})
        }

        const existingStudent = await User.findOne({
            $or: [{email}, {regno}]
        })

        if(existingStudent){
            return res.json({success:false, message: "Student with the Email or Registration number Already Exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const student = await User.create({name, email, regno, password:hashedPassword, role:"student"})

        const token = jwt.sign({id: student._id, role: student.role}, process.env.JWT_SECRET,{expiresIn:'1d'})

        res.cookie('token',token ,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 1*24*60*60*1000
        })

        return res.json({success:true,message:"Student Registered Successfully", student:{name:student.name,email:student.email,regno:student.regno}})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

//// student login (/api/student/login) ----------------------
export const login = async (req,res)=>{
    try {
        const {email,password} = req.body

        if(!email || !password){
            return res.json({success: false, message: "Email and password are required"})
        }

        const student = await User.findOne({email,role:"student"})

        if(!student){
            return res.json({success: false, message:"user with the provided Email doesn't Exist"})
        }

        const isCorrectPassword = await bcrypt.compare(password,student.password)
        if(!isCorrectPassword){
            return res.json({success:false, message: "Incorrect Password"})
        }

        const token = jwt.sign({id: student._id, role: "student"},process.env.JWT_SECRET, {expiresIn:'1d'})

        res.cookie('token',token ,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 1*24*60*60*1000
        })


        return res.json({success: true, message: 'LoggedIn successfully', student:{email:student.email, name: student.name, regno: student.regno}})

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}


//// check auth (/api/student/is-auth) ----------------- [Check if the request has a valid token.], 
// [It checks if the user is already logged in.]
export const isAuth = async (req,res)=>{
    try {
        const studentId = req.user.id
        
        const student = await User.findById(studentId).select('-password')
        if(!student) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.json({success:true, student})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message: error.message})
    }
}


///// logout student (/api/student/logout) --------------
export const logout = async (req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })

        return res.json({success: true, message: 'Logged out Successfully'})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message: error.message})
    }
}