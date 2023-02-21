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

userSchema.pre('save', function () {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 9);
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;


