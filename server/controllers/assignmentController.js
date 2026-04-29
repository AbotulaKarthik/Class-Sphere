import Submission from "../models/Submission.js";
import Assignment from "../models/Assignment.js";


///// creating an assignment by the faculty -------------------
export const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, maxMarks, classId } = req.body

    if (!title || !dueDate || !maxMarks || !classId) {
      return res.json({
        success: false,
        message: "Missing required fields"
      })
    }

    const newAssignment = await Assignment.create({
      title,
      description,
      dueDate,
      maxMarks,
      classId,
      faculty: req.user.email,
      questionFile: req.file
        ? {
            url: `/uploads/${req.file.filename}`,
            filename: req.file.filename
          }
        : null
    })

    return res.json({
      success: true,
      message: "Assignment Created Successfully",
      assignment: newAssignment
    })

  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    })
  }
}


////// get all assignments for the student ------------------------------------
export const getAssignmentsByClass = async (req,res)=>{
    try {
        const {classId} = req.query

        const assignments = await Assignment.find({classId}).sort({createdAt: -1})

        const submissions = await Submission.find({
            classId,
            student: req.user.id
        })

        const submittedIds = submissions.map(sub=> 
            sub.assignmentId.toString()
        )

        const pendingAssignments = assignments.filter(ass =>
            !submittedIds.includes(ass._id.toString())
        )

        return res.json({
            success: true,
            assignments: pendingAssignments
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


///// get an individual assignment -------------------
export const getSingleAssignment = async (req,res)=>{
    try {
        const assignment = await Assignment.findById(req.params.id)

        if(!assignment){
            return res.json({
                success: false,
                message: "Assignment not found"
            })
        }

        return res.json({
            success: true,
            assignment
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


///// submitting the assignment -----------------------
export const submitAssignment = async (req,res)=>{
    try {
        const {assignmentId, classId} = req.body

        if(!req.file){
            return res.json({
                success: false,
                message: "Upload the required Document"
            })
        }

        const newSubmission = await Submission.create({
            assignmentId,
            student: req.user.id,
            classId,
            answerFile: {
                url:`/uploads/${req.file.filename}`,
                filename: req.file.filename
            }
        })

        return res.json({
            success: true,
            message: "Assignment Submitted"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

///// get the submissions from the student ---------------------------------------
export const getSubmissions = async (req,res)=>{
    try {
        const submissions = await Submission.find({
            classId: req.params.classId
        }).populate("student","name regno")
        .populate("assignmentId","title maxMarks")

        return res.json({
            success: true,
            submissions
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//// evaluating the assignments -------------------------------
export const evaluateSubmission = async (req,res)=>{
    try {
        const {submissionId, marks} = req.body

        const submission = await Submission.findById(submissionId)

        if(!submission){
            return res.json({
                success: false,
                message: "Submission not found"
            })
        }

        submission.marks = marks
        submission.evaluated = true

        await submission.save()

        return res.json({
            success: true,
            message: "Assignment Evaluated Successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}