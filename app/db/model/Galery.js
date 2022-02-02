const mongoose = require('mongoose');

const GalerySchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    date: {
        type: Date
    },
    display:{
        type: Boolean
    },
    userId:{
        type: String
    }
});

const Galery = mongoose.model('Galery', GalerySchema)

module.exports = Galery;