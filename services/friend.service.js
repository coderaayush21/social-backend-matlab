const { User, Friend } = require('../models');

const httpStatus = require('http-status');

const CustomError = require('../utils/CustomError');

const sendFriendRequest = async (req) => {
    const userWhoSendsId = req.user._id;
    const userWhomHeSendsId = req.body.friend;
    if (userWhoSendsId === userWhomHeSendsId) {
        throw new CustomError(httpStatus.status.BAD_REQUEST, 'You cannot send a friend request to yourself');
    }
    const userWhomHeSends = await User.findById(userWhomHeSendsId);
    if (!userWhomHeSends) {
        throw new CustomError(httpStatus.NOT_FOUND, 'No such user found');
    }
    const isRequestExists = await Friend.findOne({ $or: [{ $and: [{ user: userWhoSendsId }, { friend: userWhomHeSendsId }] }, { $and: [{ user: userWhomHeSendsId }, { friend: userWhoSendsId }] }] });
    if (isRequestExists) {
        if (isRequestExists.status == 'accepted') {
            throw new CustomError(httpStatus.BAD_REQUEST, 'You are already friend');
        } else if (isRequestExists.status == 'pending') {
            console.log("hello pending")
            throw new CustomError(httpStatus.BAD_REQUEST, 'Request already Pending');
        }
    }

    Friend.create({
        user: userWhoSendsId,
        friend: userWhomHeSendsId,
        status: 'pending'
    })

    return { "message": "success" }

}

const acceptFriendRequest = async (req) => {
    const userWhoAcceptsId = req.user._id;
    const userWhoSendsId = req.body.friend;

    console.log(userWhoAcceptsId, userWhoSendsId);

    const isRequestExists = await Friend.findOne({ $or: [{ $and: [{ user: userWhoAcceptsId }, { friend: userWhoSendsId }] }, { $and: [{ user: userWhoSendsId }, { friend: userWhoAcceptsId }] }] });

    if (!isRequestExists) {
        throw new CustomError(httpStatus.NOT_FOUND, 'No such request exists');
    } else if (isRequestExists.status === 'accepted') {
        throw new CustomError(httpStatus.CONFLICT, 'Already a friend');
    } else {
        isRequestExists.status = 'accepted';
        await isRequestExists.save();
        return { "success": true }
    }
}


module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
};