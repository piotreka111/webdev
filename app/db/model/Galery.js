const mongoose = require('mongoose');

const GalerySchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Date
    },
    display:{
        type: Boolean
    }
});

const Galery = mongoose.model('Galery', GalerySchema)

module.exports = Galery;