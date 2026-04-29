import mongoose from 'mongoose'

const ClassSchema = mongoose.Schema({
    classId: {type: String, required: true, unique: true},
    className: {type: String, required: true},
    facultyEmail: {type: String,required: true},
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, {timestamps: true})

const Class = mongoose.models.Class || mongoose.model("Class",ClassSchema)

export default Class