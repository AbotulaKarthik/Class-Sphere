import jwt from 'jsonwebtoken'

export const authFaculty = (req,res,next)=>{
    const {token} = req.cookies

    if(!token){
        return res.json({
            success: false,
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== 'faculty'){
            return res.json({
                success: false,
                message: "Access Denied"
            })
        }
        
        req.user = decoded
        next()
    } catch (error) {
         return res.status(401).json({
            success: false,
            message: "Invalid Token"
        })
    }
}