const mongoose = require("mongoose")

const HotelSchema = new mongoose.Schema({
    Name: {
        type: String,
        unique: true
    },
    Type: {
        type: String,
    },
    City: {
        type: String,
    },
    Address: {
        type: String,
        //required:true
    },
    Image: {
        type: String,
       
    },
    Image1: {
        type: String,
        
    },
    Image2: {
        type: String,
        
    },
    Image3: {
        type: String,
        
    },
    Image4: {
        type: String,
       
    },
    Rating: {
        type: String
    },
  
    Rooms:[],
  
    Desc: {
        type: String,
    },
    comment : { 
        type: Array
         },
    room:{
        ref:"Room",
        type: mongoose.Schema.Types.ObjectId,
    }

})

const Hotel = mongoose.model("Hotels", HotelSchema)
module.exports = Hotel