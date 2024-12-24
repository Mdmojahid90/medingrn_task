const errorMiddleware = async(err,req,res,next)=>{
  const status = err.status || 500
  const message = err.message || "Backend Message Error"
  const extraMessage = err.extraMessage || "Backend Extra Details Error "


  return res.status(status).json({message,extraMessage})
}

module.exports =errorMiddleware