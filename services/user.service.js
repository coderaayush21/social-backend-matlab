const { User, Friend } = require('../models');

const httpStatus = require('http-status');

const CustomError = require('../utils/CustomError');
const JwtService = require('../utils/JwtService');


async function registerUserService(requestBody) {
    //Checks if user is already registered or not : If yes then should login
    if (await User.isEmailAlreadyRegistered(requestBody.email)) {
        throw new CustomError(httpStatus.CONFLICT, 'Email already registered'); // resource already taken
    } else {
        //Creates a new user in the database 
        const user = await User.create(requestBody);
        return user;
    }
}

async function loginUserService(requestBody) {
    //Checks if user is already registered or not : if not then should register first

    let user = await User.findOne({ email: requestBody.email });

    if (!user) {
        throw new CustomError(httpStatus.BAD_REQUEST, 'Please register first');
    }
    //Checks for password match
    if (! await user.passwordMatch(requestBody.password)) {
        throw new CustomError(httpStatus.BAD_REQUEST, "Password mismatch");
    }
    //returns JWT TOKEN after succesfull autentication 
    return JwtService.getJwtToken(user);
} 

module.exports = {
    registerUserService,
    loginUserService,
}