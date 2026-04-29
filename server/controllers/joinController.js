import Class from '../models/Class.js'
import JoinRequest from '../models/JoinRequest.js'

///// send a request to join the class -----------
export const sendJoinRequest = async (req,res)=>{
    try {
        const {classId} = req.body

        if(!classId){
            return res.json({
                success: false,
                message: "ClassId is Required"
            })
        }

        const classExist = await Class.findOne({classId})

        if(!classExist){
            return res.json({
                success: false,
                message: "Class with the provided ClassId not Found !"
            })
        }

        if(classExist.students.includes(req.user.id)){
            return res.json({
                success: false,
                message: "You are already a member of the class"
            })
        }

        const existingRequest = await JoinRequest.findOne({
            classId,
            student: req.user.id
        })

        if(existingRequest){
            res.json({
                success: false,
                message: "Request already sent"
            })
        }

        await JoinRequest.create({
            classId,
            student: req.user.id
        })

        return res.json({
            success: true,
            message: "Join Request sent"
        })


    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//// fetching all the requests sent to the class by the faculty -----------------
export const getClassRequests = async (req,res)=>{
    try {
        const {classId} = req.query

        const requests = await JoinRequest.find({
            classId,
            status: "pending"
        }).populate("student","name regno email")

        return res.json({
            success: true,
            requests
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


///// accept / reject the requests --------------------
export const handleJoinRequest = async (req,res)=>{
    try {
        const { requestId, action } = req.body
        
        const request = await JoinRequest.findById(requestId)

        if(!request){
            return res.json({
                success: false,
                message: "Request not found"
            })
        }

        if(action === "accept"){
            request.status = "accepted"

            await Class.findOneAndUpdate(
                { classId : request.classId },
                { $addToSet: { students: request.student }}
            )
        }else if (action === "reject"){
            request.status = "rejected"
        }

        await request.save()

        return res.json({
            success: true,
            message: `Request ${action}ed successfully`
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}