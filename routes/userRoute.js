const express = require("express")
const  userController = require("../controllers/userController")
const verifyEmail= require("../middleware/verifyEmail")
//const { verifyTokenAndAdmin,verifyTokenAndUser, verifyToken } = require("../middleware/verifyToken")
const validate=require("../middleware/validation")
const registerschema=require("../validation/validate")


const userRoute = express()

userRoute.post("/create", validate(registerschema),userController.register)
userRoute.post("/login",verifyEmail,userController.login)
userRoute.post("/forgotpsw",userController.forgotPassword)
userRoute.post("/resetpassword/:token",userController.resetPassword)
userRoute.get("/get/:_id",userController.getSingleUser)
// userRoute.get("/all",verifyTokenAndUser,getAll)
userRoute.get("/all",userController.getAll)
userRoute.delete("/delete/:_id",userController.delete)
userRoute.patch("/update/:_id",userController.updateUser)
userRoute.get("/verifyemail/:token",userController.emailVerification)
module.exports = userRoute