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