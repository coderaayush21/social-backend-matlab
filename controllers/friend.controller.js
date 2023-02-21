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

module.exports = {
    sendFriendRequestController,
    acceptFriendRequestController,
}