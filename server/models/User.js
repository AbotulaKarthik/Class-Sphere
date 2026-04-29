import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    regno: {type: String, sparse: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["student","faculty"], required: true}
},{timestamps: true})

const User = mongoose.models.User || mongoose.model('User',userSchema)

export default User