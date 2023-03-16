 const mongoose=require("mongoose")
const hotel=require("../models/Hotel")
 const RoomSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotels',
        required: true
    },
    Price: {
        type: String
       
    },
    maxPeople: {
        type: String,
    },
    roomNumber:{
        type:String
    }
    // User:{
    //     ref:"User",
    //     user_id:mongoose.Schema.Types.ObjectId,
    // }

 })
 
const Room = mongoose.model("Rooms", RoomSchema)
module.exports = Room
