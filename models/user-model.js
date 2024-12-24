const mongoose = require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const userSchema= new mongoose.Schema({
  username:{type:String,required:true},
  email:{type:String,required:true},
  phone:{type:String,required:true},
  password:{type:String,required:true},
  cpassword:{type:String,required:true},
  isAdmin:{type:Boolean, default:false}
})


//Securing password by bcryptjs
userSchema.pre("save", async function(next){
  try{
    if(!this.isModified("password"))
      {next()}
    
    this.password=await bcrypt.hash(this.password,10)
    this.cpassword=undefined
    
    next()
  }catch(err){
    return res.status(400).json({message:"Password Not Hashed"})
  }
})


// Generating token by jwt

userSchema.methods.generateToken= async function(){
  try{
   const token =jwt.sign({userId:this._id.toString(),email:this.email,isAdmin:this.isAdmin},process.env.SECRET_KEY,{expiresIn: 60 * 60})
   return token
  }catch(err){
    return res.status(400).json({message:"Token Not Generated"})
  }
}

const User= new mongoose.model("User",userSchema)
module.exports=User