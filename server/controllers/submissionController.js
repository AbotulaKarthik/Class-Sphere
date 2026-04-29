

//// submitting the assignment ---------------------------
export const submitAssignment = async (req,res)=>{
    try {
        const { assidnmentId, classId } = req.body

        if(!assidnmentId || !classId || !req.file){
             return res.json({
                success: false,
                message: "Missing required fields"
            })
        }

        const existing = await Submission.findOne({
        assignment: assignmentId,
        student: req.student.id
        })

        if (existing) {
        return res.json({
            success: false,
            message: "Already submitted"
        })
        }

        const newSubmission = await Submission.create({
            assignment: assignmentId,
            student: req.student.id,
            classId,
            file: {
                url: `/uploads/${req.file.filename}`,
                filename: req.file.filename
            }
        })

        return res.json({
            success: true,
            message: "Assignment submitted successfully",
            submission: newSubmission
        })
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}