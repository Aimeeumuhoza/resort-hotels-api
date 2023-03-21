const express =require( "express");
const commentController =require("../controllers/commentController");

const commentRoute = express.Router()

commentRoute.post("/create/:hotelid" , commentController.createcomment)
commentRoute.get("/all",commentController.getAllcomment)
commentRoute.get("/comment/:hotelid", commentController.getHotelComment)

module.exports= commentRoute
