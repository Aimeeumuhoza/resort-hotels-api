const mongoose = require("mongoose")

const HotelSchema = new mongoose.Schema({
    Name: {
        type:String,
        //required:true
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User"
    },
    Type: {
        type: String,
    },
   
    City: {
        type: String,
    },
    Address:{
        type:String,
        //required:true
    },
   
    Image: {
        type: String,
       // default:'avatar',   
    },
    Rating:{
        type:String
      },
    Rooms: {
        type: String,
    },
    
    Price: {
        type: Number,
        //required:true
    },
    Desc: {
        type: String,
    },
   
})

const Hotel = mongoose.model("Hotels", HotelSchema)
module.exports = Hotel