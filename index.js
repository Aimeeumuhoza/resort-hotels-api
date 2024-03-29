const express = require('express')
const dotenv = require("dotenv")
const  morgan =require ("morgan");
const swaggerUI = require ("swagger-ui-express")
const docs =require ("./swagger.json");
dotenv.config()
const dataB = require("./database/dataB")
const userRoute = require("./routes/userRoute")
const hotelRoute=require("./routes/hotelRoute")
const roomRoute=require("./routes/roomRoute")
const commentRoute = require('./routes/commentRoute')
const cors = require("cors")
const app = express()
const fileupload = require("express-fileupload")

app.use(
    fileupload({
      useTempFiles: true
    })
  );
app.use(cors({origin: "*"}));
app.use(express.json())
app.use(morgan('dev'));
app.use("/user",userRoute)
app.use("/hotel",hotelRoute)
app.use("/room",roomRoute)
app.use("/comment",commentRoute)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

const port =  process.env.PORT;
dataB()
// function used to connect servers
app.listen(port,()=>{
     //template string
    console.log(`server is connected on ${port}`)
    // double quotes
    //console.log("server is connected")
})
