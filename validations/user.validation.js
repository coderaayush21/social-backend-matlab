const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

const registerUserSchema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required()
});

const friendRequestSchema = joi.object().keys({
    fromid: joi.objectId().required(),
    toid: joi.objectId().required()
});

module.exports = {
    registerUserSchema,
    friendRequestSchema,
}