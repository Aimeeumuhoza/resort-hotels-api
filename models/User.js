const mongoose=require ("mongoose")

const userSchema = new mongoose.Schema({
    username : { type: String,required:true},
    email : { type: String,required:true },
    password : { type: String,required:true },
    role:{
        type: String,
        enum:["client","manager","admin"],
        default:"client"
    },
    emailToken:{
        type: String,
    },
     isVerified:{
      type:  Boolean,
      defaultValue: false
    },
    
},
)

const User = mongoose.model("users", userSchema)
module.exports = User