const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
        type: Number,
        required: [true, "Please provide your number"],

    },
    password: {
        type: String,
        required: [true, "PLease provide your password"],
        // select:false

    },
    role: {
        type: String,
        required: true,
        enum: ["Job Seeker", "Employer"]
    },

}, { timestamps: true })

//HASHING PASSWORD
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
})


//COMPARING PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


// GENERATE A JWT WEB TOKEN FOR AUTHORIZATION
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })
}


const User=mongoose.model("User",userSchema);

module.exports=User