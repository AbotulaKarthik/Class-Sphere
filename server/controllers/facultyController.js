/// faculty login (/api/faculty/login) -------

import jwt from "jsonwebtoken";

export const facultyLogin = async (req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.json({success: false, message:"Missing Credentials"})
        }

        if(email !== process.env.FACULTY_EMAIL || password != process.env.FACULTY_PASSWORD){
            return res.json({
                success:false,
                message: "Invalid Credentials"
            })
        }

        const token = jwt.sign(
            {role: "faculty", email: process.env.FACULTY_EMAIL},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )

        res.cookie("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 1*24*60*60*1000
        })

        return res.json({
            success: true,
            message: "LoggedIn as Faculty"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const isFacultyAuth = (req,res)=>{
    return res.json({
        success: true,
        message: "Faculty Authenticated"
    })
}