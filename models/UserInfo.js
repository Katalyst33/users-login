const mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    Name: String,
    email: String,
    dob: Date,
    bio: String,
    password:String,
    date: Date
});

const User = mongoose.model('User', UserSchema, );


module.exports = User;
