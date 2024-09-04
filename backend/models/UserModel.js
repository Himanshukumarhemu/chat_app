import mongoose, { Mongoose } from "mongoose";

const UserModel = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    Username:{
        type:String,
        reqired:true,
        unique:true
    },
    password:{
        type:String,
        reuired:true
    },
    profilephoto:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:true
    }
},{timestamps:true});
export const User = mongoose.model("User",UserModel);