const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

const registerUserSchema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required()
}); 

module.exports = {
    registerUserSchema,

}