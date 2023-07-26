const mongoose = require('mongoose');

const hashtagClicks = new mongoose.Schema({
    hashtag: {
      type: String,
      required: true,
      unique: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  });

  module.exports = mongoose.model('hashtag-clicks', hashtagClicks)