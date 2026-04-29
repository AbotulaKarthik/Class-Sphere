import mongoose from 'mongoose'

const connectDb = async ()=>{
    try {
        mongoose.connection.on('connected',()=>{
            console.log("connected to Database")
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/classSphere`)
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDb