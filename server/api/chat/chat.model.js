'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ChatSchema = new Schema({
  username: String,
  message: String,
  timestamp: Number,
});

module.exports = mongoose.model('Chat', ChatSchema);
