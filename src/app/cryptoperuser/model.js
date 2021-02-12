const mongoose = require("mongoose");

const cryptoPerUserSchema = new mongoose.Schema({
    "User": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    "idCrypto": {
        type: [String],
        required: true,
        maxItems: 24
    }
});

const CryptoPerUser = mongoose.model('cryptoPerUser', cryptoPerUserSchema);
module.exports = CryptoPerUser;