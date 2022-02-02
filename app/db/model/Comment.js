const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: {
        type: String
    },
    date: {
        type: Date
    },
    user: {
        type: String
    },
    pictureId: {
        type: String
    }
});

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment;