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
        enum: ['accepted', 'pending']
    }
});

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;