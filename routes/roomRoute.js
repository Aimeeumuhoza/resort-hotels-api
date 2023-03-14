const express = require("express")
const roomController=require("../controllers/roomController")


const roomRoute = express()


 roomRoute.post("/create",roomController.createRoom)
 module.exports = roomRoute