const User = require("../models/user-model")
const bcrypt=require("bcryptjs")

// Register user logic
const register=async(req,res)=>{
  const password= req.body.password
  const cpassword= req.body.cpassword
  const email = req.body.email;

  if(password !== cpassword){
    return res.status(400).json({message:"Password Are Not Same"})
  }
  try{
   const userExist = await User.findOne({email:email})
   if(userExist){
    return res.status(400).json({message:"User Already Exist"})
   }

   const userCreated= await new User({
    username:req.body.username,
    email:req.body.email,
    phone:req.body.phone,
    password:req.body.password,
    cpassword:req.body.cpassword
   })

   const resultData= await userCreated.save();
   console.log(resultData)
   const token= await userCreated.generateToken()
   return res.status(201).json({message:"Registration Successful!",token:token,userId:resultData._id.toString()})

  }catch(err){
    return res.status(400).json({message:"Backend Register Server Some Issue",err})
  }
}


// login user logic

const login = async(req,res)=>{
  const email = req.body.email;
  const password= req.body.password
  try{
    const userData=await User.findOne({email:email});
    if(!userData){
     return res.status(400).json({message:"User Does Not Exist"})
    }
   
   const isMatch= await bcrypt.compare(password,userData.password)
   if(isMatch){
    const token = await userData.generateToken()
    return res.status(200).json({message:"Login Successfull",token:token,userId:userData._id.toString()})
   }else{
    return res.status(400).json({message:"Password is Incorrect"})
   }

  }catch(err){
    return res.status(400).json({message:"Backend Login Server Some Issue",err})
  }
}

// Get login user data logic 
const user = async(req,res)=>{
try{  
   const userData = req.user;
  return res.status(200).json(userData)
}catch(err){
  // return res.status(400).json({message:"User Data Not Found",err})

  console.log(` error from user route ${err}`);
}
}


module.exports={register,login,user}