import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    role:{
        type: String,
        default: "student",
        enum:["admin", "student", "company"]
    },
    id:{
        type:String
    }
},{timestamps:true})

export default mongoose.model('Users', userSchema)

