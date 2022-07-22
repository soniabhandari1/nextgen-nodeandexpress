const userModel = require("../model/User.js");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request.js");
const UnauthenticatedError = require("../errors/unauthenticated.js");
const register = async (req, res) => {
  const user = await userModel.create(req.body);
  const token=user.createJWT() //creation of token
  res.status(StatusCodes.CREATED).json({ user: { name: user.name },token });
};

//new portion of code
const login=async(req,res)=>{
  const {email,password}=req.body
  if(!email||!password){
    throw new BadRequestError('Please provide email and password')
  }
  const user=await userModel.findOne({email})
  if(!user){
    throw new UnauthenticatedError('enter valid credentials')
  }
  const isPasswordCorrect=await user.comparePassword(password)
  if(!isPasswordCorrect){
    throw new UnauthenticatedError('invalid password')
  }
  const token=user.createJWT()
  res.status(StatusCodes.OK).json({user:{name:user.name},token})
}
module.exports = {register,login};
