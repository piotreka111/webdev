const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: {
        type: String
    },
    date: {
        type: Date
    }
});

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment;