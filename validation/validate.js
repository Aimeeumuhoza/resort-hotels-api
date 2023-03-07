const Joi = require('joi');
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

module.exports = registerschema