const express = require("express")
const roomController=require("../controllers/roomController")


const roomRoute = express()

 roomRoute.post("/create/:_id",roomController.createRoom)
 roomRoute.get("/get/:_id",roomController. getRoom)
 roomRoute.delete("/delete/:_id",roomController.delete)
 roomRoute.patch("/update/:_id",roomController.updateRoom)
 module.exports = roomRoute
 