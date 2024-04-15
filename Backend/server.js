const app = require("./app")
const cloudinary=require("cloudinary")

cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})



app.listen(process.env.PORT,()=>{
    console.log(`server is listening on ${process.env.PORT}`)
})