import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    classId: {
        type: String,
        required: true
    },
    answerFile: {
        url: String,
        filename: String
    },
    marks: {
        type: Number,
        default: null
    },
    evaluated: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Submission = mongoose.models.Submission || mongoose.model("Submission",submissionSchema)

export default Submission