const mongoose = require("mongoose")

require("dotenv").config({ path: "../.env" })


const dbConnection = async () => {
    await mongoose.connect(`${process.env.MONGO_URI}/job_seek`,{
        
    }).then((result) => {
       console.log("Connected Successfully") 
    }).catch((err) => {
        console.log("some kind of error")
    });
}

module.exports=dbConnection