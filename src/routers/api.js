const router = require('express').Router();
const articleRouter = require('./article-api');
const authAPIRouter = require('./auth-api');
const { videoLimiter } = require('../middlewares/limter-middleware');

router.use('/article', articleRouter);
router.use('/auth', authAPIRouter);

// /api/videolimit
router.post('/videolimit', videoLimiter(), (req, res) => {
  const { useTime } = req.body;
  req.session.video.useTime += useTime;
  console.log('video 사용량: ', req.session.video.useTime);
  res.send('ok');
});

const Chat = require('../models/chat');
const Room = require('../models/room');
// const mongoose = require('mongoose');
async function addChat(roomId, username, content) {
  //   const model = mongoose.model('Chat');
  const chat = await Chat.create({
    user: username,
    roomId: roomId,
    content: content,
  });

  return chat;
}

router.post('/chat', async (req, res) => {
  /**
   * socket.io express app에서 사용하기.
   * server->client 통신
   */
  const io = req.app.get('io');
  const vcNsc = io.of('/videochat');

  const { content, roomId, username } = req.body;

  let room = await Room.findOne({ roomId: roomId });
  if (!room) {
    room = Room.create({ roomId });
  }
  // db.save
  const chat = await addChat(room._id, username, content);
  console.log(chat);

  // socket.io event emit
  vcNsc.to(roomId).emit('message', username, content);
  res.json('okay');
});

module.exports = router;
