module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('connection');

    socket.on('disconnect', () => {
      console.log('연결 종료');
      clearInterval(socket.interval);
    });

    socket.on('event1', (data) => {
      console.log('event1', data);
    });

    socket.emit('add-li', 'message');
    socket.interval = setInterval(() => {
      socket.emit('add-li', 'Hello SOCKET.IO.js');
    }, 3000);
  });

  const chatRoom = io.of('/CHATROOM');
  chatRoom.on('connection', (socket) => {
    socket.on('join-room', (roomId, username) => {
      socket.join(roomId);
      console.log(roomId);
      // 환영메시지
      chatRoom.to(roomId).emit('msg:broad', `${username}님이 입장하였습니다.`);

      socket.on('leave-room', (roomId) => {
        socket.leave(roomId);
      });
      socket.on('msg:send', (msg) => {
        console.log(msg);
        socket.to(roomId).emit('msg:get', msg);
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
    });
  });
};
