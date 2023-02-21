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

async function viewFriendRequestsService(req) {
    //If user tries to view requests of some other user
    if (!(req._id === req.params.id)) {
        throw new CustomError(httpStatus.UNAUTHORIZED, 'You can only view your requests');
    }
    //Else user can view requests of him
    const response = await User.findById(req.params.id).populate({ path: 'request', select: { email: 1 } }).select({ path: 'request' });
    return response;
}

async function acceptFriendRequestService(req) {

    const userWhoAccepts = await User.findById(req._id);
    const userWhoSends = await User.findById(req.params.id);
    const found = userWhoAccepts.request.find((e) =>
        e.toString() === req.params.id
    );

    // if there is no such request
    if (!found) {
        throw new CustomError(httpStatus.NOT_FOUND, 'No such request found')
    }

    //userWhoAccepts and userWhoSends are friends now
    userWhoAccepts.request.splice(idx, 1);
    userWhoAccepts.friends.push(req.params.id);
    userWhoSends.friends.push(req._id);
    const response = await userWhoAccepts.save();
    await userWhoSends.save();
    return response;
}


async function rejectFriendRequestService(req) {

    const user = await User.findById(req._id);
    const found = user.request.find((e) => e.toString() === req.params.id);
    //If no such requests
    if (!found) {
        throw new CustomError(httpStatus.NOT_FOUND, 'No such request found')
    }

    //Delete the request from the request queue
    user.request.splice(idx, 1);
    const response = await user.save();
    return response;
}

async function viewAllfriendsService(req) {
    const userWhoWantsToView = await User.findById(req._id);
    const userWhoGetsViewed = await User.findById(req.params.id);

    //If user wants to view hi friends or he wants to view his friends's friends list 
    console.log(userWhoGetsViewed.isFriendOf(userWhoWantsToView))
    if (req._id == req.params.id || userWhoGetsViewed.isFriendOf(userWhoWantsToView)) {
        const response = await User.findById(req.params.id).populate({ path: 'friends', select: { email: 1 } }).select({ friends: 1 });
        return response;
    } else {
        throw new CustomError(httpStatus.UNAUTHORIZED, 'You are unauthorized to view this page')
    }
}

module.exports = {
    registerUserService,
    loginUserService,
    viewFriendRequestsService,
    acceptFriendRequestService,
    rejectFriendRequestService,
    viewAllfriendsService
}