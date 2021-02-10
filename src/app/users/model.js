const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    "nombre": {
        type: String,
        required: true
    },
    "apellido": {
        type: String,
        required: true
    },
    "username": {
        type: String,
        required: true,
        unique: true
    },
    "contraseña": {
        type: String,
        required: true,
        validate: passwordValidator
    },
    "moneda": {
        type: String,
        required: true
    }
});

const User = mongoose.model('users', userSchema);
module.exports = User;