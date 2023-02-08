
const User = require("../models/User")
const dotenv = require ('dotenv');
//const  verifyToken =require
//const TokenAuth =   require('../helper/AuthToken');
//const generatePassword = require('../helper/generatePassword');
const {sign} = require("../helper/jwt")
dotenv.config()
const bcrypt = require("bcrypt")
const mailer = require("../helper/transport")
const crypto = require("crypto")
class userController{

static async register(req,res){
        try {
            //const uniqueId = Math.floor(Math.random()*900000) + 100000
            const emailToken = crypto.randomBytes(16).toString("hex");
            const salt = await bcrypt.genSalt(8)
            const hashpsw = await bcrypt.hash(req.body.password,salt)
            req.body.password = hashpsw

            const user= new User({
            
                username: req.body.username,
                email: req.body.email, 
                password: hashpsw,
                emailToken : emailToken,
                role: req.body.role || "client",
                isVerified: false,
                
            })  
            const isExist= await User.findOne({ where: { email: req.body.email, } });
              if(isExist){
                 return res.status(200).json({message:"email already exist try another one!"})
              }
            
            const savedUser=  await user.save()
            res.status(200).json({message:"user created successfully",savedUser})

            await mailer({email:user.email,emailToken:user.emailToken} ,"createAccount").catch((error)=>{
                console.log(error)

              })
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

static async emailVerification(req,res){   
    try {
        const token = req.params.token
        const user = await User.findOne({ emailToken:token   }) 
        if(user){
            user.emailToken = null,
            user.isVerified = true
            await user.save()
            res.json({message:"account verified successfully"})
        } else {
            res.json({error:"invalid token"})
        }   
    }catch (error) {
        
        return res.status(500).json({error: "server error"})
    }

}
static async login(req,res){
        try {
            const user = await User.findOne({email: req.body.email})
           
            if(user){
              const isMatch = await bcrypt.compare(req.body.password, user.password)
               if(isMatch){
                 const token = await sign({id:user._id,email:user.email,role:user.role})
                 user.password = null
                 return res.status(200).json({message:"user logged in successfully",token,user})
               }
               
                return res.status(404).json({error:"Password is incorrect"})
           
            }
            

        } catch (error) {
            return res.status(400).json({error:error.message})
        }
    }

//     static async updateUser(req,res){
//         try {
//             if(req.body.password){
//                 req.body.password = CryptoJS.AES.encrypt(
//                     req.body.password,
//                     process.env.PASS_SEC
//                     ).toString()
//             }
//             const userUpdate = await User.findByIdAndUpdate(
//             req.params._id,
//             {
//                 $set: req.body,
//             },
//             { new:true}
//             )
//             return res.status(200).json({message:"user updated successfully", userUpdate})
//         } catch (error) {
//             return res.status(500).json({error:error.message})
//         }
//     }
//     static async getAll(req,res){
//         const query = req.query.new
//         try {
//             const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find()
//             return res.status(200).json(users)
//         } catch (error) {
            
//             return res.status(500).json({error:error.message})
//         }
//     }
//     static async getSingleUser(req,res){
//         try {
//             const id = req.params._id
//             const user = await User.findById(id)
//             const {password , ...others} = user._doc
//             return res.status(200).json({message:"user found", others})
//         } catch (error) {
//             return res.status(500).json({error:error.message})
//         }
//     }
//     static async delete(req,res){
//         try {
//             const id = req.params._id
//             console.log(id);
//             const user = await User.findByIdAndDelete(id)
//             return res.status(200).json({message:"user deleted successfully", user})
//         } catch (error) {
//             return res.status(500).json({error:error.message})
//         }
//     }
static async forgotPassword(req,res){
    try {
      const user = await User.findOne({where:{ email: req.body.email }})
      
        if(!user){
            res.json({error:"there is no user with this email"})
        }
        const userInfo ={
          token : jwt.sign({uuid: user.uuid },process.env.RESET_PASSWORD_KEY),
          email :user.email
        } 
      //   console.log(userInfo);
       await sendEmail(userInfo,'forgotPassword').then(()=>{
           console.log('Email sent successfully')
          }).catch(err=>{
              console.log(err);
          })
          return res.status(200).send({message:'Password reset mail Sent Successfully'})
  } catch (error) {
        return res.status(404).json({error:error.message}) 
    }
}
static async resetPassword (req,res){
    try {
         const token = req.params.token
         if(token){
             const data = await jwt.verify(token , process.env.RESET_PASSWORD_KEY)
             const userInfos = await User.findOne({where:{ uuid:data.uuid.toString()}})
             console.log(userInfos);
             if(!userInfos){
                 return res.status(404).json({error: "user not found"})
             }
             const salt = await bcrypt.genSaltSync(10);
             const newHashedPassword = await bcrypt.hash(req.body.password, salt)
             const user = await User.findOne({ where:{uuid: userInfos.uuid }})
             console.log(user);
             user.password = newHashedPassword
             user.isVerified = true;
             await user.save()
             res.status('201').json({message:'Password reset successfully',user})
         }
    } catch (error) {
       return res.status(404).json({error:error.message})
    }

}
//     // GET USER STATS

//     static async stats(req,res){
//         const date = new Date();
//         const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
//         try {
//             const data = await User.aggregate([
//                 {$match : { createdAt: {$gte: lastYear}}},
//                 {
//                     $project:{
//                         month :{$month: "$createdAt"}
//                     },
//                 },
//                 {
//                     $group:{
//                         _id:"$month",
//                         total:{$sum:1 }
//                     }
//                 }
//             ])
//             return res.status(200).json({message:"user stats", data})
//         } catch (error) {
//             return res.status(500).json({error:error.message})
//         }
//     }


 }

 module.exports =  userController