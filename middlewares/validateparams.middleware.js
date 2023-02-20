/* 
*Params Validation Middleware:  
*/ 

const httpStatus = require('http-status');
const CustomError = require('../utils/CustomError');

module.exports = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
        return next(new CustomError(httpStatus.BAD_REQUEST, error.message));
    }
    next();
}