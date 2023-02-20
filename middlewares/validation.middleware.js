/* 
* Body validation middleware 
*/ 

const httpStatus = require('http-status');
const CustomError = require('../utils/CustomError');

module.exports = (schema) => (req, res, next) => {
    // console.log("===============================", schema);
    const { error } = schema.validate(req.body);
    if (error) {
        return next(CustomError(httpStatus.BAD_REQUEST, error.message));
    }
    next();
}


