import mongoose from 'mongoose'

const assignmentSchema = mongoose.Schema({
    classId: {type: String, required: true},
    faculty: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String},
    dueDate: {type: Date, required: true},
    maxMarks: {type: Number, required: true},
    questionFile: {
        url: String,
        public_id: String
    }
},{timestamps: true})

const Assignment = mongoose.models.Assignment || mongoose.model('Assignment',assignmentSchema)

export default Assignment