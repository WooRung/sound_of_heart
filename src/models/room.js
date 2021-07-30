const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room = new Schema({
  total: {
    type: Number,
    required: true,
    default: 2,
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: mongoose.model('User'),
  },
  roomId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Room', Room);
