/* 
*Error Handler Middleware  
*/
const CustomError = require('../utils/CustomError');
const httpStatus = require('http-status');
module.exports = (err, req, res, next) => {

    let { statusCode, message } = err; 

    console.log("ERROR===================================>", err)

    if (!(err instanceof CustomError)) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = 'Internal Server Error'
    }

    const errResponse = {
        statusCode,
        message
    }
    return res.status(statusCode).json(errResponse);
} 
