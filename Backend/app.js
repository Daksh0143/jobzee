const express =require("express")
const cors=require("cors")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const userRouter=require("./routes/userRouter")
const jobRouter=require("./routes/jobRouter")
const applicationRouter=require("./routes/applicationRouter")
const dbConnection = require("./database/dbConnection")
const { errorMiddleware } = require("./middlewares/error")



require("dotenv").config() 

const app=express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}));

app.use("/api/v1/user",userRouter)
app.use("/api/v1/application",applicationRouter)
app.use("/api/v1/job",jobRouter)
dbConnection()
app.use(errorMiddleware)
module.exports=app