const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
    },
    endDate: {
        type: Date
    }
});

const Token = mongoose.model('Token', TokenSchema)

module.exports = Token;