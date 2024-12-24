const {z} = require("zod")

const login = z.object({
  email:z.string({required_error:"Email is Required"}).email({message:"Invalid Email Address"}).trim().min(3,{message:"Email Must Be At Least 3 Charecters"}).max(100,{message:"Email Cann't Be More Than 100 Charecters"}),
  password:z.string({required_error:"Password is Required"}).trim().min(6,{message:"Password Must Be At Least 6 Charecters"}).max(50,{message:"Password Cann't Be More Than 50 Charecters"}),
})

const register= login.extend({
  username:z.string({required_error:"Name is Required"}).trim().min(3,{message:"Name Must Be At Least 3 Charecters"}).max(50,{message:"Name Cann't Be More Than 50 Charecters"}),
  phone:z.string({required_error:"Phone is Required"}).trim().min(10,{message:"Phone Must Be At Least 10 Charecters"}).max(10,{message:"Phone Cann't Be More Than 10 Numbers"}),
  cpassword:z.string({required_error:"Confirm Password is Required"}).trim().min(6,{message:"Confirm Password Must Be At Least 6 Charecters"}).max(50,{message:"Confirm Password Cann't Be More Than 50 Charecters"}),
})


module.exports={register,login}