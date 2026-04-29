import jwt from 'jsonwebtoken'

export const authStudent = async (req,res,next)=>{
    const {token} = req.cookies

    if(!token){
        return res.json({success:false, message: "Token not Available!"})
    }

    try {
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
        if(tokenDecode.role !== "student"){
            return res.json({
                success: false,
                message: "Access Denied"
            })
        }

        req.user = tokenDecode
        next()
    } catch (error) {
        return res.json({success: false, message:error.message})
    }
}