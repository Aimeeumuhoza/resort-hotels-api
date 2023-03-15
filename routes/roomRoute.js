const express = require("express")
const roomController=require("../controllers/roomController")


const roomRoute = express()


 roomRoute.post("/create",roomController.createRoom)
 roomRoute.get("/get/:_id",roomController. getRoom)
 roomRoute.get("/All/:hotelId",roomController.getAllRoom)
 roomRoute.delete("/delete",roomController.delete)
 module.exports = roomRoute