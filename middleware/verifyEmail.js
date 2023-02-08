const User = require("../models/User")
const  verifyEmail = async(req,res,next)=>{
    try {
        const user = await User.findOne( {email:req.body.email })
        console.log(user)
        if(user.isVerified){
            next()
        }else{
            res.status(201).json({message:"please check your email to verify account"})
        }
       } catch (error) {
        console.log(error)
        return res.status(500).json({error: "user credentials not found"})
    }
}
module.exports = verifyEmail