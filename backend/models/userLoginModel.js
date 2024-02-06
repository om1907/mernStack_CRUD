const mongoose=require('mongoose');
const validator=require('validator');

const userLoginSchema=new mongoose.Schema({
    
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    }
})

module.exports=mongoose.model('userLogin',userLoginSchema);