const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chat = new Schema({
  user: {
    type: String,
    required: true,
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Chat', Chat);
