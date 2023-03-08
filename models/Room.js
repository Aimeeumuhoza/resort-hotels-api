const mongoose=require("mongoose")

 const RoomSchema = new mongoose.Schema({
    Price: {
        type: String
       

    },
    maxPeople: {
        type: String,
    },
    Description:{
        type:String
    }
 })
