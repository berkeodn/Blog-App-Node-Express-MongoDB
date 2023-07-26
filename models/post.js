const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    content: {
        type: String,
        required: true,
        trim: true
    },
    
    date: {
        type: Date,
        default: new Date()
    }

})

module.exports = mongoose.model('post', Post)