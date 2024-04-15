const catchAsyncError = require("../middlewares/catchAsyncerror");
const { ErrorHandler } = require("../middlewares/error");
const User = require("../models/user.model");
const sendToken = require("../utills/jwtToken");

const register = async (req, res, next) => {
    // const {name,email,phone,role,password}=req.body;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const role = req.body.role;
    const password = req.body.password;

    if (!name || !email || !phone || !role || !password) {
        return next(new ErrorHandler("Please fill all the detail", 401))
    }
    const isExsit = await User.findOne({
        $or: [
            { 'email': email }, { 'phone': phone }
        ]
    },);

    if (isExsit) {
        if (isExsit.email === email) {
            return next(new ErrorHandler("Email already exists"))
        }
        if (isExsit.phone === phone) {
            return next(new ErrorHandler("Phone number already exists"))
        }
        
        return next(new ErrorHandler("User Already Exists"))
    }

        const user = await User.create({
            name, email, phone, role, password
        })
        sendToken(user,200,res,"User registered successfully")
}

const login=async(req,res,next)=>{
    const {email,password,role}=req.body
    if(!email || !password || !role){
        return next(new ErrorHandler("Please Fill All the Detail",401))
    }
    const user =await User.findOne({email})
    console.log(user)
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }
    const isPasswordMatched=await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }

    if(role!==user.role){
        console.log("Daxesh",user.role)
        return next(new ErrorHandler("User with role is not found",401))
    }
    sendToken(user,200,res,"Login Successfully")

}

const logout=catchAsyncError(async(req,res,next)=>{
    res.status(201).cookie("token","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({success:true,message:"User Logout Successfully"})
})

const getUser=async(req,res,next)=>{
    const user=req.user;
    res.status(201).json({
        success:true,
        user
    })
}

module.exports = { register ,login,logout,getUser}