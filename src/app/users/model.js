const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "lastname": {
        type: String,
        required: true
    },
    "username": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true,
        //validate: passwordValidator
    },
    "preferredCoin": {
        type: String,
        required: true,
        enum: ['ars', 'usd', 'eur']
    }
});

const User = mongoose.model('users', userSchema);
module.exports = User;