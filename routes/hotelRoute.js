const express = require("express")
const hotelController= require("../controllers/hotelController")
const validate=require("../middleware/validation")
const {hotelschema} = require("../validation/validate");

const upload = require("../helper/multer")

const hotelRoute = express()

 hotelRoute.post("/create",upload.array("Image",4),hotelController.createHotel)
 hotelRoute.get("/get/:_id",hotelController.gethotel)
// hotelRoute.get("/getcity/city",hotelController.gethotelcity)
 hotelRoute.get("/all",hotelController.getAllHotels)
 hotelRoute.get("/counthotelbycity/:city",hotelController.countHotelByCity )
 hotelRoute.get("/countbytype/:type",hotelController.countByType )
 hotelRoute.get("/gethotelRooms/:id",hotelController.getHotelRooms)
 hotelRoute.delete("/delete/:_id",hotelController.delete)
 hotelRoute.patch("/update/:_id",hotelController.updateHotel)
module.exports = hotelRoute
