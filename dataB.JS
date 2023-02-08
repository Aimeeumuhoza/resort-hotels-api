const mongoose = require("mongoose")
//const dotenv = require("dotenv")
//dotenv.config()
const dbURL   = "mongodb+srv://umuhoza:umuhoza@cluster0.lq8fbsl.mongodb.net/hotel"

const dataB = async()=>{
    try {

     await mongoose.connect(dbURL, {useNewUrlParser: true}, mongoose.set("strictQuery", false)).then(()=>{
        console.log("database connected successfully")
     })
     //mongoose.set("strictQuery", false);
    } catch (error) {
        console.log(error)
    }

}

module.exports =dataB 