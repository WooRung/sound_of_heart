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
    console.log('chatroom connection');

    socket.on('disconnect', () => {
      console.log('연결 종료');
      clearInterval(socket.interval);
    });

    socket.interval = setInterval(() => {
      socket.emit('add-li', 'Hello SOCKET.IO.js');
    }, 3000);
  });
};
