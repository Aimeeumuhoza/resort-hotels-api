const express = require('express')
const dotenv = require("dotenv")
dotenv.config()
const dataB = require("./database/dataB")
const userRoute = require("./routes/userRoute")
const hotelRoute=require("./routes/hotelRoute")
const roomRoute=require("./routes/roomRoute")
const commentRoute = require('./routes/commentRoute')
const app = express()

app.use(express.json())
app.use("/user",userRoute)
app.use("/hotel",hotelRoute)
app.use("/room",roomRoute)
app.use("/comment",commentRoute)
const port =  process.env.PORT;
dataB()
// function used to connect servers
app.listen(port,()=>{
     //template string
    console.log(`server is connected on ${port}`)
    // double quotes
    //console.log("server is connected")
})