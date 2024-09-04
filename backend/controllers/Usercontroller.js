import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, Username, password, confirmPassword, gender } = req.body;
    if (!fullName || !Username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are Required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }

    const user = await User.findOne({ Username });
    if (user) {
      return res.status(400).json({ message: "User already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //profilephoto
    const maleprofilephoto = `https://avatar.iran.liara.run/public/boy?Username=${Username}`;
    const femaleprofilephoto = `https://avatar.iran.liara.run/public/girl?Username=${Username}`;

    await User.create({
      fullName,
      Username,
      password: hashedPassword,
      profilephoto: gender === "male" ? maleprofilephoto : femaleprofilephoto,
      gender,
    });
    return res.status(201).json( {
        message:"Account created sucessfully.",
        success:true 
    })
  } catch (error) {
    console.log(error);
  }
}; 
export const login = async (req,res)=>{
  try{
    const {Username,password} = req.body;
    if (!Username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    };
    const user =await User.findOne({Username});
    if(!user){
      return res.status(400).json({
        message:"Incorrect username or password",
        sucess:false
      })
    };
    const isPasswordMatch = bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
      return res.status(400).json({
        message:"Incorrect username or password",
        success:false
      })
      };
     const tokenData={
      userId:user._id
     };
     const token =await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
 
     return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000 , httpOnly:true, sameSite:'strict'}).json({
      _id:user._id,
      username:user.Username,
      fullName:user.fullName,
      profilephoto:user.profilephoto
     });
     

  }catch (error){
    console.log(error);
  }
}
export const logout =(req,res) =>{
  try{
      return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"logged out successfully."
      })
  } catch (error){
    console.log(error);
  }
}
export const getOtherUsers = async (req,res)=>{
  try{
    const loggedInUserId = req.id;
    const otherUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
    return res.status(200).json(otherUsers);
  }catch(error){
    console.log(error);   
  }
}