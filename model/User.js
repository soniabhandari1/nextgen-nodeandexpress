const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')
require('dotenv').config()

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    maxlength: 10,
    minlength: 5,
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: 8,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//new portion of code
UserSchema.methods.createJWT=function(){
  return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:'3d'})
}

UserSchema.methods.comparePassword=async function(candidatepassword){
  const isMatch=await bcrypt.compare(candidatepassword,this.password)
  return isMatch
}

module.exports = mongoose.model("User", UserSchema); //s was missing
