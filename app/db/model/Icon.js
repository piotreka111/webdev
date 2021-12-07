const mongoose = require('mongoose');

const IconSchema = new mongoose.Schema({
    type: {
        type: String,
    }
});

const Icon = mongoose.model('Icon', IconSchema)

module.exports = Icon;