const mongoose = require('mongoose');
const { MONGO_URL } = require('../config')

mongoose.connect(MONGO_URL).then(() => {
    console.log('=========================>ConnectEd to Database');
}).catch((err) => {
    console.log("==========================> error", err);
});