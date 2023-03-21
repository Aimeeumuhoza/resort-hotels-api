const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    description : { 
        type: String 
    },
},
)
const Comment = mongoose.model("comments", commentSchema)
module.exports =  Comment