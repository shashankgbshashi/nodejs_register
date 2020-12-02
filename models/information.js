const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
});

studentSchema.methods.generateToken = async function(){
    try {
        const token = await jwt.sign({_id : this._id.toString()},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log("Error in generating token");
        
    }
}

studentSchema.pre("save", async function(next){
    // check is the password is modified;
    if(this.isModified("password")) this.password = await bcrypt.hash(this.password , 10);
    next();
});

const studentModel = new mongoose.model("studentInfo" , studentSchema);

module.exports = {studentModel};
