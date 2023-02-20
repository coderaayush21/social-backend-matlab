/* 
*Authorization Middleware -: 
*/ 

const httpStatus = require('http-status');
const CustomError = require('../utils/CustomError');
const JwtService = require('../utils/JwtService');

module.exports = function (req, res, next) {
    const headers = req.headers.authorization;
    if (!headers) {
        return next(new CustomError(httpStatus.UNAUTHORIZED, 'Please Login First'));
    }
    const token = headers.split(' ')[1];

    try {
        //!SESSION LOGIC
        const res = JwtService.verifyJwtToken(token);
        req._id = res._id;
        req.loggedIn = true;
        next();
    } catch (error) {
        console.log(error, "verification failed");
        return next(CustomError(httpStatus.UNAUTHORIZED, 'Please Login First'));
    }
}  

