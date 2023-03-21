const Joi = require("joi");
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

const registerschema = Joi.object().keys({
    username: Joi.string().alphanum().max(30).required().label("name"),
    email: Joi.string().lowercase().required().label("email"),
    password:joiPassword
    .string()
    .minOfSpecialCharacters(2)
    .minOfLowercase(2)
    .minOfUppercase(2)
    .minOfNumeric(2)
    .noWhiteSpaces()
    .required(),
});
const hotelschema = Joi.object().keys({
    Name: Joi.string().alphanum().max(30).required().label("name"),
    Type: Joi.string().required().valid('hotel','motel','valhalla','apartment').label("type"),
    City: Joi.string().required().label("city"),
    Address: Joi.string().required().label("address"),
    Image: Joi.string().label("image"),
    Rating: Joi.string().label("rating"),
    Rooms: Joi.number().required().label("rooms"),
    Price: Joi.string().label("price"),
    Desc: Joi.string().label("desc"),
});

module.exports = {registerschema,hotelschema}