const joi = require('@hapi/joi');
joi.objectId = require('joi-objectid')(joi)

const friendRequestSchema = joi.object().keys({
    friend: joi.objectId().required(),
}); 

module.exports = { 
    friendRequestSchema,
}