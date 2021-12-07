const mongoose = require('mongoose');

const PictureSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Date
    },
    filename: {
        type: String
    },
    path: {
        type: String
    },
    size: {
        type: "Number"
    },
});

const Picture = mongoose.model('Picture', PictureSchema)

module.exports = Picture;