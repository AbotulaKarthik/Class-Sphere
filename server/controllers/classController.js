import Class from "../models/Class.js"


/// creating a class for faculty only -------------------------
export const createClass = async (req,res)=>{
    try {
        const {classId, className} = req.body

        if(!classId || !className){
            return res.json({
                success: false,
                message: "Class ID and ClassName are Required"
            })
        }

        const existingClass = await Class.findOne({classId})
        if(existingClass){
            res.json({
                success: false,
                message: "Class with the ClassID already Exists!"
            })
        }

        const newClass = await Class.create({
            classId,
            className,
            facultyEmail: req.user.email
        })

        return res.json({
            success: true,
            message: "Class Created Successfully",
            class: newClass
        })

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


///// get all the classes ----------------------------------------
export const getFacultyClasses = async (req,res)=>{
    try {
        const classes = await Class.find({
            facultyEmail: req.user.email
        })

        return res.json({
            success: true,
            classes
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//// get the classes for the student in which he is a part of -------------
export const getStudentClasses = async (req,res)=>{
    try {
        const studentId = req.user.id

        const classes = await Class.find({
            students: studentId
        }).select("classId")

        return res.json({
            success: true,
            classes
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

///// search for the class ---------------------------------------
export const searchClass = async (req,res)=>{
    try {
        const {classId} = req.query

        if(!classId){
            return res.json({
                success: false,
                message: "Class Id required"
            })
        }

        const classes = await Class.find({
            classId: { $regex: classId, $options: "i"}
        })

        return res.json({
            success: true,
            classes
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


//// get all the students of the Class -------------
export const getClassStudents = async (req,res)=>{
    try {
        const {classId} = req.query

        if(!classId){
            return res.json({
                success: false,
                message: "Class Id is required"
            })
        }

        const classData = await Class.findOne({classId}).populate("students", "name regno email")

        if(!classData){
            return res.json({
                success: false,
                message: "Class Not FOUND !"
            })
        }

        return res.json({
            success: true,
            students: classData.students
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

///// remove student from the class ------------------------
export const removeStudent = async (req,res)=>{
    try {
        const {classId, studentId} = req.body

        if(!classId || !studentId){
            return res.json({
                success: false,
                message:"Class ID and Student ID are required"
            })
        }

        const classData = await Class.findOne({ classId });

        if (!classData) {
            return res.json({
                success: false,
                message: "Class not found"
            });
        }

        classData.students = classData.students.filter(
            id => id.toString() !== studentId
        )

        await classData.save()

        return res.json({
            success: true,
            message: "Student removed successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}