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

/* 
*Validation of params  
*Checks if the user is logged in or not if not logged in he cannot send any request else 
*Checks if the user is already a friend or not
*Check if request from a user is already pending.  
*If not then sends request
*/ 
const sendFriendRequestController = async (req, res, next) => {
    try {
        const response = await userService.sendFriendRequestService(req.params);
        return res.status(httpStatus.OK).json(response);
    } catch (e) {
        next(e);
    }
}

/*  
*Validation of params  
* Checks if the user is logged in or not if not then he cannot view his requests else
* Checks the user is only viewing his requests and not of others
* User can view his requests
*/
const viewFriendRequestsConroller = async (req, res, next) => {
    try {
        const response = await userService.viewFriendRequestsService(req);
        return res.status(httpStatus.OK).json(response);
    } catch (e) {
        next(e);
    }
}

/* 
*Checks if user is logged in or not  
*Checks if the request is already there 
*Removes the request from pending queue and adds the user(who sends the req) to friend list of the user who accepted 
*/
const acceptFriendRequestController = async (req, res, next) => {
    try {
        const response = await userService.acceptFriendRequestService(req);
        return res.status(httpStatus.OK).json(response);
    } catch (error) {
        next(error);
    }
}

/* 
*Checks if the user is logged in or not 
*If logged in the user delets it's request and 
*/
const rejectFriendRequestController = async (req, res, next) => {
    try {
        const response = await userService.rejectFriendRequestService(req);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
} 

/* 
*Checks if the user is logged in or not 
*If logged in then checks if user is friend of other user or not 
*If yes then he can view other user's friendlist else not
*/
const viewAllFriendsController = async (req, res, next) => {
    try {
        const response = await userService.viewAllfriendsService(req);
        return res.status(httpStatus.OK).json(response);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    registerUserController,
    loginUserController,
    sendFriendRequestController,
    viewFriendRequestsConroller,
    acceptFriendRequestController,
    rejectFriendRequestController,
    viewAllFriendsController,
}

