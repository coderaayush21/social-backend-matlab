const { User, Friend } = require('../models');

const httpStatus = require('http-status');

const CustomError = require('../utils/CustomError');

const sendFriendRequest = async (req) => {
    const userWhoSendsId = req.user._id; 
    const userWhomHeSendsId = req.body.friend;
    let updatedRelation;
    if (userWhoSendsId === userWhomHeSendsId) {
        throw new CustomError(httpStatus.status.BAD_REQUEST, 'You cannot send a friend request to yourself');
    }
    const userWhomHeSends = await User.findById(userWhomHeSendsId);
    if (!userWhomHeSends) {
        throw new CustomError(httpStatus.NOT_FOUND, 'No such user found');
    }
    const relation = await Friend.getRelation(userWhoSendsId, userWhomHeSends);
    if (relation) {
        if (relation.status == 'accepted') {
            throw new CustomError(httpStatus.BAD_REQUEST, 'You are already friend');
        } else if (relation.status == 'pending') {
            throw new CustomError(httpStatus.BAD_REQUEST, 'Request already Pending');
        } else if (relation.status == 'rejected') {
            updatedRelation = relation.updateRelation('pending');
        }
    } else {
        updatedRelation = await Friend.create({
            user: userWhoSendsId,
            friend: userWhomHeSendsId,
            status: 'pending'
        });
        return { "message": "success", "relation": updatedRelation }
    }
}

const acceptFriendRequest = async (req) => {
    const userWhoAcceptsId = req.user._id;
    const userWhoSendsId = req.body.friend;
    const relation = await Friend.getRelation(userWhoAcceptsId, userWhoSendsId);
    console.log(relation)

    if (!relation || relation.status === 'rejected') {
        throw new CustomError(httpStatus.NOT_FOUND, 'No such request exists');
    } else if (relation.status === 'accepted') {
        throw new CustomError(httpStatus.CONFLICT, 'Already a friend');
    } else {
        const updatedRelation = await relation.updateRelation('accepted');
        return { "message": "success", "relation": updatedRelation }
    }
}

const rejectFriendRequest = async (req) => {
    const userWhoRejectsId = req.user._id;
    const userWhoSendsId = req.body.friend;

    const relation = await Friend.getRelation(userWhoRejectsId, userWhoSendsId);

    if (!relation || relation.status === 'rejected' || relation.status === 'accepted') {
        throw new CustomError(httpStatus.NOT_FOUND, 'Request Not found');
    } else {
        const updatedRelation = await relation.updateRelation('rejected');
        return { "message": "success", "relation": updatedRelation }
    }
}

const viewFriends = async (req) => {
    const userWhoWantsToViewId = req.user._id;
    const userWhoGetsViewedId = req.body.friend;
    const relation = await Friend.getRelation(userWhoWantsToViewId, userWhoGetsViewedId);

    const friends = await Friend.viewFriends(userWhoGetsViewedId);

    if (!relation && userWhoGetsViewedId === userWhoWantsToViewId) {
        return friends;
    }
    else if (!relation && relation.status === 'rejected' || relation.status === 'pending') {
        throw new CustomError(httpStatus.UNAUTHORIZED, 'You are unauthorized to view this page');
    }

    return friends;
}

module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    viewFriends
}; 
