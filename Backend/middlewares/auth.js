const User = require("../models/user.model");
const catchAsyncError = require("./catchAsyncerror");
const { ErrorHandler } = require("./error");
const jwt=require("jsonwebtoken")




const isAuthorized=async(req,res,next)=>{
     const {token} =req.cookies;
     console.log(token)
     if(!token){
        return next(new ErrorHandler("User not authorized",400))
     }
     const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);

     req.user=await User.findById(decoded.id);
     next()
}

module.exports={ isAuthorized }