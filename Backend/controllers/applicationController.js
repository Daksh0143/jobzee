const { ErrorHandler } = require("../middlewares/error")
const Application = require("../models/application.model")
const Job=require("../models/job.model")
const cloudinary=require("cloudinary")



const employerGetApplication=async(req,res,next)=>{
    const{ role }=req.user
    if(role==="Job Seeker"){
        return next (new ErrorHandler("Job Seeker is not allowed to access this resource!",401))
    }
    const {_id} =req.user

    const application=await Application.find({"employerId.user":_id});
    
    res.status(200).json({
        success:true,
        application,
    })
}
const jobSeekerGetApplication=async(req,res,next)=>{
    const{ role }=req.user
    if(role==="Employer"){
        return next (new ErrorHandler("Employer is not allowed to access this resource!",401))
    }
    const {_id} =req.user
    const application=await Application.find({"applicantID.user":_id});
    res.status(200).json({
        success:true,
        application
    })
}

const jobSeekerDeleteApplication=async(req,res,next)=>{
    const{ role }=req.user
    if(role==="Employer"){
        return next (new ErrorHandler("Job Seeker is not allowed to access this resource!",401))
    }
    const {id} =req.params;

    const application=await Application.findById(id);

    if(!application){
        return next (new ErrorHandler("Application is not found!",401))
    }

    await application.deleteOne()

    res.status(201).json({
        success:true,
        message:"Application delete successuflly"
    })
       
}

const postApplication=async(req,res,next)=>{
    const{ role }=req.user
    if(role==="Employer"){
        return next (new ErrorHandler("Employer is not allowed to access this resource!",401))
    }
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Resume Files are required",401))
    }
    const {resume}=req.files
    
    const allowedFormats=["image/png","image/jpg","image/webp","image/jpeg"]
    if(!allowedFormats.includes(resume.mimetype)){
        return next (new ErrorHandler("Please upload your file in PNG,JPG,WEBP or JPEG format",401))
    }
    const clodinaryResponce=await cloudinary.uploader.upload(
        resume.tempFilePath
    );
    if(!clodinaryResponce || clodinaryResponce.error){
        console.error("Cloudinary Error",clodinaryResponce.error || "Unknown Cloduinary error")
        return next(new ErrorHandler("Failed to Upload resume",501))
    };
    const {name,email,coverLetter,phone,address,jobId} =req.body
    const applicantID={
        user:req.user._id,
        role:"Job Seeker"
    };
    if(!jobId){
        return next(new ErrorHandler("Job not found",401))
    }
    const jobDetail=await Job.findById(jobId)
    if(!jobDetail){
        return next(new ErrorHandler("Job not found",401))
    }
    const employerId={
            user:jobDetail.postedBy,
            role:"Employer"
    };
    if(!name || !email || !coverLetter || !phone || !address || !applicantID ||!employerId || !resume){
        return next(new ErrorHandler("Please fill all the details"))
    }   
    const application= await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerId,
        resume:{
            public_id:clodinaryResponce.public_id,
            url:clodinaryResponce.secure_url
        }
    })
    res.status(200).json({
        success:true,
        message:"Application Submiited",
        application
    })
    
}


module.exports={employerGetApplication,jobSeekerDeleteApplication,jobSeekerGetApplication,postApplication}