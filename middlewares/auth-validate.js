const validate = (Schema)=> async(req,res,next)=>{
try{
const parseBody = await Schema.parseAsync(req.body);
req.body=parseBody;
next()
}catch(err){
  const status = 422;
  const message = "Fill Input Values Properly"
  const extraMessage = err.errors[0].message

  const error = {status,message,extraMessage}
  next(error)
}
}

module.exports= validate