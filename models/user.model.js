/* 
*User Models 
*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    request: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    friends: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }
});

/* 
*Checks if the user is aleardy registerd or not  
*/
userSchema.statics.isEmailAlreadyRegistered = async function (email) {
    const user = await this.findOne({ email });
    return !!user; // Convert to boolean value
}

/* 
*Compares the password of the user against the password entered
*/
userSchema.methods.passwordMatch = function (password) {
    const res = bcrypt.compareSync(password, this.password);
    return !!res; // Convert to boolean value 
}

/* 
*Checks if the request already pending to accept 
*/
userSchema.methods.requestAlreadyExists = function (fromUser) {
    return this.request.includes(fromUser.id);
}

/* 
*Checks if two users are friends or not  
*/
userSchema.methods.isFriendOf = function (user) {
    return this.friends.includes(user.id);
}

//!DONT USE CALLBAKS HERE BECAUSE OF THIER THIS BINDING :=
// userSchema.pre('save', async () => {
//     console.log('================================>', this);
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 9);
//     }
// });  

/* 
*Hash Password every time  
*/
userSchema.pre('save', function () {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 9);
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;


