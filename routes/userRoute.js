const express = require("express")
const  userController = require("../controllers/userController")
const verifyEmail= require("../middleware/verifyEmail")
//const { verifyTokenAndAdmin,verifyTokenAndUser, verifyToken } = require("../middleware/verifyToken")

const userRoute = express()

userRoute.post("/create", userController.register)
userRoute.post("/login",verifyEmail,userController.login)
userRoute.post("/forgotpw",userController.forgotPassword)
userRoute.get("/reset",userController.resetPassword)
// userRoute.get("/get/:_id",getClient)
// userRoute.get("/all",verifyTokenAndUser,getAll)
// userRoute.delete("/delete/:_id",verifyTokenAndAdmin,delet)
// userRoute.patch("/update/:_id",verifyTokenAndUser,update)
userRoute.get("/verifyemail/:token",userController.emailVerification)
module.exports = userRoute