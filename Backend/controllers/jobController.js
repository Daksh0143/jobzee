const catchAsyncError = require("../middlewares/catchAsyncerror");
const { ErrorHandler } = require("../middlewares/error");
const Job =require("../models/job.model")
const sendToken = require("../utills/jwtToken");


const getAllJobs=async(req,res,next)=>{
    const jobs=await Job.find({expired:false});
    res.status(200).json({success:true,jobs})
}

const postJobs=async(req,res,next)=>{
    const {role} =req.user;
    if(role==="Job Seeker"){
        return next (new ErrorHandler("Job Seeker is not allowed to access this resource!",401))
    }
    const {
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo} =req.body
    
    if(!title || !description || !category || !country || !city || !location){
        return next(new ErrorHandler("Please enter all the field",401))
    }
    if((!salaryFrom || !salaryTo) && !fixedSalary){
        return next(new ErrorHandler("Please enter the salary detail"))
    }
    if(salaryFrom && salaryTo && fixedSalary){
        return next (new ErrorHandler("You can't enter both fix and range salary"))
    }

    const postedBy=req.user._id;
    const job=await Job.create({
        title,
        discription:description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy
        
    })
    res.status(200).json({success:true,message:"Job Posted Successfully",job})
}

const getMyJobs=async(req,res,next)=>{
    const{ role }=req.user
    if(role==="Job Seeker"){
        return next (new ErrorHandler("Job Seeker is not allowed to access this resource!",401))
    }
    const myJobs= await Job.find({postedBy:req.user._id})
    res.status(201).json({success:true,myJobs,message:"Success get my Jobs"})

}

const updateJob=async(req,res,next)=>{
    const{ role }=req.user
    if(role==="Job Seeker"){
        return next (new ErrorHandler("Job Seeker is not allowed to access this resource!",401))
    }
    const {id}= req.params;
    let job= await Job.findById(id)
    if(!job){
        return next (new ErrorHandler("Job not found !",401))
    }
    job=await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(201).json({succes:true,job,message:"Job updated successfully"})
}

const deleteJob=async(req,res,next)=>{
    const{ role }=req.user
    if(role==="Job Seeker"){
        return next (new ErrorHandler("Job Seeker is not allowed to access this resource!",401))
    }
    const {id}= req.params;
    console.log("id>>>>>>>>.",id);
    let job= await Job.findById(id)
    if(!job){
        console.log("not found");
        return next (new ErrorHandler("Job not found !",401))
    }
    await job.deleteOne();
    res.status(201).json({success:true,message:"Jobs Deleted Successfully"})
    
}

const getSingleJob=async(req,res,next)=>{
    const {id} =req.params;
    try {
        const job=await Job.findById(id);
        if(!job){
            return next(new ErrorHandler("Job not found",401))
        }
        res.status(200).json({succes:true,job})
    } catch (error) {
        return next(new ErrorHandler("Invalid Id",501))
    }
}

module.exports={getAllJobs,postJobs,getMyJobs,updateJob,deleteJob,getSingleJob}