const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Array,
        default: [],
    },
    replies:[{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Comment'
    }]
})

module.exports = mongoose.model('Comment', commentSchema); 