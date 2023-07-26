const mongoose = require('mongoose');

const Auth = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: new Date()
    }

})

module.exports = mongoose.model('auth', Auth)