const mongoose = require('mongoose');

const friendSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    friend: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ['accepted', 'pending', 'rejected']
    }
});

friendSchema.statics.getRelation = async function (user, friend) {
    console.log(this)
    return await this.findOne({ $or: [{ $and: [{ user: user }, { friend: friend }] }, { $and: [{ user: friend }, { friend: user }] }] });
}

friendSchema.methods.updateRelation = async function (status) {
    this.status = status;
    return await this.save();

}

friendSchema.statics.viewFriends = async function (userId) {
    return await this.find({ friend: userId }).populate({ path: 'user', select: { email: 1 } }).select({ user: 1 });
}

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;