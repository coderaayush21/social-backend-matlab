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
        const user = JwtService.verifyJwtToken(token);
        delete user.password;
        req.user = user;
        next();
    } catch (error) {
        console.log(error, "verification failed");
        return next(CustomError(httpStatus.UNAUTHORIZED, 'Please Login First'));
    }
}

