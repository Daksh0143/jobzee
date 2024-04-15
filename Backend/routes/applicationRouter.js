const express= require("express")
const catchAsyncError = require("../middlewares/catchAsyncerror")

const {employerGetApplication,jobSeekerDeleteApplication,jobSeekerGetApplication,postApplication} = require("../controllers/applicationController")
const { isAuthorized } = require("../middlewares/auth")
const router=express.Router()

router.get("/employer/getall",isAuthorized,catchAsyncError(employerGetApplication))
router.get("/jobSeeker/getall",isAuthorized,catchAsyncError(jobSeekerGetApplication))
router.delete("/delete/:id",isAuthorized,catchAsyncError(jobSeekerDeleteApplication))
router.post("/post",isAuthorized,catchAsyncError(postApplication))



module.exports=router