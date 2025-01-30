import mongoose from "mongoose";

const signupSchema=new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
        minlength:2,
        maxlength:10

    },
    LastName:{
        type:String,
        minlength:2,
        maxlength:10
    },
    Email:{
        type: String,
        required: true,
        unique: true
    },
    Password:{
        type:String,
        required:true,
        minlength:4
    },
    confirmPassword:{
         type:String,
         required:true,
         minlength:4
         
    }

})

const validSignup=mongoose.model('signupValue',signupSchema)


export default validSignup


