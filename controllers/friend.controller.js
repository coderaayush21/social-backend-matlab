const { friendService } = require('../services');
const httpStatus = require('http-status');

const sendFriendRequestController = async (req, res, next) => {
    try {
        const response = await friendService.sendFriendRequest(req);
        return res.status(httpStatus.OK).json(response);
    } catch (error) {
        next(error);
    }
}

const acceptFriendRequestController = async (req, res, next) => {
    try {
        const response = await friendService.acceptFriendRequest(req);
        return res.status(httpStatus.OK).json(response);
    } catch (error) {
        next(error);
    }
}

const rejectFriendRequestController = async (req, res, next) => {
    try {
        const response = await friendService.rejectFriendRequest(req);
        return res.status(httpStatus.OK).json(response);
    } catch (error) {
        next(error);
    }
}

const viewFriendsController = async (req, res, next) => {
    try {
        const response = await friendService.viewFriends(req);
        return res.status(httpStatus.OK).json(response);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    sendFriendRequestController,
    acceptFriendRequestController,
    rejectFriendRequestController,
    viewFriendsController,
}