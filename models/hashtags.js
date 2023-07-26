const mongoose = require('mongoose');

const Hashtags = new mongoose.Schema({
    hashtag: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    slug: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        default: "200"
    }
})

module.exports = mongoose.model('hashtags', Hashtags)