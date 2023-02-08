const  jwt = require("jsonwebtoken")
const  dotenv = require("dotenv")



dotenv.config() 

const sign = (data)=> jwt.sign({data},process.env.SECRET_KEY,{expiresIn: '72h'})
const verify = (data) => jwt.verify(data, process.env.SECRET_KEY)

module.exports = {sign, verify}