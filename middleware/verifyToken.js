const {verify} = require("../helper/jwt")
const  jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()
const verifyToken = (req,res,next)=>{
   const token =  req.headers.authorization

   const user = jwt.verify(token, process.env.SECRET_KEY)
   if(!user){
     return res.status(400).json({message:"token is required"})
   }
   req.token =token
   req.user = user
   console.log(req.user)
  
}
 
const verifyTokenAndAdmin = async(req,res,next) => {

  const token =  req.headers.authorization
  const user = verify(token)
    if(user.data.role === "admin"){
      next()
    }else{
      res.status(500).json("you don't have access")
    }
  
}

const verifyTokenAndUser = (req,res,next)=>{
  const token =  req.headers.authorization
  const user = verify(token)
    if(user.data._id === req.params._id || "client" ){
      next()
    }else{
      res.status(500).json("you don't have access")
    }
}


module.exports = {verifyToken,verifyTokenAndUser,verifyTokenAndAdmin}