import mongoose from 'mongoose'

const joinRequestSchema = new mongoose.Schema({
    classId:{type: String, required: true},
    student: {type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending","accepted","rejected"],
        default: "pending"
    }
},{timestamps: true})

const JoinRequest = mongoose.models.JoinRequest || mongoose.model("JoinRequest",joinRequestSchema)

export default JoinRequest