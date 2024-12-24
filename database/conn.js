const mongoose = require("mongoose")

const URL=process.env.MONGODB_URI
const ConnectionDB= async()=>{
  try{
  await mongoose.connect(URL)
  console.log("DataBase connected successfully...")
  }catch(err){
   console.log("Connection failed...",err) 
  }
}

module.exports=ConnectionDB