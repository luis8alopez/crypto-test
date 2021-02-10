const mongoose = require("mongoose");

const cryptoPerUserSchema = new mongoose.Schema({
    "User": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    "idCrypto": {
        type: [String],
        required: true
    }
});

const CryptoPerUser = mongoose.model('cryptoPerUser', cryptoPerUserSchema);
module.exports = CryptoPerUser;