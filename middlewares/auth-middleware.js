const User = require("../models/user-model")
const jwt = require("jsonwebtoken")

const authMiddleware = async (req,res,next)=>{
  const token = req.header("Authorization")
  if(!token){
    return res.status(400).json({message:"Unauthorized HTTP, Token Not Provided"})
  }
  const jwtToken = token.replace("Bearer","").trim()
  try{
    const isVarified= jwt.verify(jwtToken,process.env.SECRET_KEY)

    const userData= await User.findOne({email:isVarified.email}).select({password:0})
    
    req.user=userData
    req.token=token
    req.userId=userData._id.toString()

    next()

  }catch(err){
  return res.status(400).json({message:"Unauthorized Invalid Token"})
  }
}

module.exports=authMiddleware