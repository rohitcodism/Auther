
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please provide an username"],
    },
    email:{
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Please provide an password"],
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyToken: String,
    verifyTokenExpiry: String,
})

const User =  mongoose.models.user || mongoose.model("user", userSchema);

export default User;