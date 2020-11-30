const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 2 , maxlength : 20
    },
    email : {
        type : String,
        required : true,
        unique : [true, "Email already registered"]
    },
    phoneNUmber : {
        type : Number
    },
    password : {
        type : String , 
        required : true
    }
});

studentSchema.pre("save", async function(next){
    // check is the password is modified;
    if(this.isModified("password")) this.password = await bcrypt.hash(this.password , 10);
    next();
});

const studentModel = new mongoose.model("studentInfo" , studentSchema);

module.exports = {studentModel};
