const express = require("express")

const hotelController= require("../controllers/hotelController")
const upload = require("../helper/multer")

const hotelRoute = express()


 hotelRoute.post("/create",hotelController.createHotel)
 hotelRoute.get("/get/:_id",hotelController.gethotel)
 hotelRoute.get("/getcity/city",hotelController.gethotelcity)
 hotelRoute.get("/all",hotelController.getAllHotels)
 hotelRoute.delete("/delete/:_id",hotelController.delete)
// hotelRoute.patch("/update/:_id",verifyTokenAndAdmin,updateproduct)
module.exports = hotelRoute
