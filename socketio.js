const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');
const Room = mongoose.model('Room');
module.exports = (io) => {
  /**
   * [/videochat] Server Event
   * @event "join-room": room 참여
   * @event "notice": 공지
   * @event "chat": 채팅 보내기
   * @event "leave-room": room 떠나기
   */
  const vcNsc = io.of('/videochat');
  vcNsc.on('connection', (socket) => {
    vcNsc.on('notice', (notice) => {
      vcNsc.emit('message', notice);
    });
    socket.on('join-room', (roomId, username, peerId) => {
      socket.join(roomId);
      let room;
      Room.findOne({ roomId: roomId }).then((_room) => {
        room = _room;
        if (!_room) {
          Room.create({ roomId: roomId }).then((_room) => {
            room = _room;
          });
        }
      });
      socket.to(roomId).emit('user-connected', peerId);

      vcNsc
        .to(roomId)
        .emit('message', username, `${username} 님이 입장하였습니다.`);

      socket.on('chat', (msg) => {
        Chat.create({ roomId: room._id, user: username, content: msg });
        vcNsc.to(roomId).emit('message', username, msg);
      });

      socket.on('leave-room', () => {
        socket.leave(roomId);
      });
    });
    socket.on('disconnect', () => {
      console.log('socket is disconnected');
    });
  });

  // socket.on('message', (msg) => {
  //   socket.to(roomId).emit('message', `socket ${msg}`);
  //   chatRoom.to(roomId).emit('message', `ns: ${msg}`);
  //   // NameSpace vs socket의 차이:
  //   // 메시지를 전송하는 주체가 Namespace level
  //   // chatRoom.to()...
  //   // vs
  //   // 소켓 level (socket.to()...)
  //   // Room상관없이 이벤트를 발생
  // });
};
