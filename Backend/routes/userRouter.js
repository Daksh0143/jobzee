const express= require("express")
const { register,login,logout,getUser } = require("../controllers/userController")
const catchAsyncError = require("../middlewares/catchAsyncerror")
const {isAuthorized} =require("../middlewares/auth")

const router=express.Router()

router.post("/register",catchAsyncError(register) )
router.post("/login",catchAsyncError(login) )
router.get("/logout",isAuthorized,catchAsyncError(logout))
router.get("/getUser",isAuthorized,catchAsyncError(getUser))






module.exports=router