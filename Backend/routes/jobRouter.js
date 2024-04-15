const express= require("express")
const { getAllJobs,postJobs,getMyJobs,updateJob,deleteJob,getSingleJob } = require("../controllers/jobController")
const catchAsyncError = require("../middlewares/catchAsyncerror")
const { isAuthorized } = require("../middlewares/auth")

const router=express.Router()

router.get("/get",catchAsyncError(getAllJobs))
router.post("/post",isAuthorized,catchAsyncError(postJobs))
router.get("/getOwnJobs",isAuthorized,catchAsyncError(getMyJobs))
router.put("/updateJobs/:id",isAuthorized,catchAsyncError(updateJob))
router.delete("/deleteJobs/:id",isAuthorized,catchAsyncError(deleteJob))
router.get("/getSingle/:id",isAuthorized,catchAsyncError(getSingleJob))




module.exports=router