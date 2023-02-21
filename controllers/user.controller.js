const { userService } = require('../services');
const httpStatus = require('http-status');

/* 
* Validates email and password of the user 
* Checks if the user has already registered or not 
* If Not saves the user in the db else throws a error  
*/
const registerUserController = async (req, res, next) => {
    try {
        let user = await userService.registerUserService(req.body);
        delete user.password;
        return res.status(httpStatus.CREATED).json(user);
    } catch (error) {
        return next(error);
    }
}

/* 
* Validates email and password of the user 
* Checks if the user has already registered or not 
* If Not then throws an error to register the user first if yes 
* Compares the email and password if false then throws an error 
* Else returns JWT TOKEN 
*/
const loginUserController = async (req, res, next) => {
    try {
        let response = await userService.loginUserService(req.body);
        return res.status(httpStatus.OK).json({ token: response });
    } catch (error) {
        return next(error);
    }
} 

module.exports = {
    registerUserController,
    loginUserController,
}

