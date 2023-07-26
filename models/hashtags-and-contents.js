const mongoose = require('mongoose');

const HashtagsContents = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },

    hashtag: {
        type: Array,
        required: true,
        trim: true
    },

    status: {
        type: String,
        default: "200"
    },

    date: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('hashtags-and-contents', HashtagsContents)