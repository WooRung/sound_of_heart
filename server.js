const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./src/models');
// socket.io
const SocketIO = require('socket.io');

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, '.env')
      : path.resolve(__dirname, '.development.env'),
});

const app = require('./src/app');
const http = require('http');

const server = http.createServer(app);

const io = SocketIO(server, {
  cors: {
    origin: '*',
  },
  path: '/socket.io',
  transports: ['websocket', 'polling'],
});

const sock = require('./socketio');
sock(io);

// io.on('connection', (socket) => {
//   const req = socket.request;
//   const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//   console.log('새로운 클라이언트'.ip, socket.id, req.id);

//   socket.on('disconnect', () => {
//     console.log('클라이언트 접속 해제', ip, socket.id);
//     clearInterval(socket.interval);
//   });
//   socket.on('error', (err) => {
//     console.error(err);
//   });
//   socket.on('reply', (data) => {
//     console.log(data);
//   });

//   socket.interval = setInterval(() => {
//     socket.emit('news', 'Hello Socket.IO');
//   }, 3000);

//   socket.on('join-room', (roomId, userId) => {
//     socket.on('message', (message) => {
//       // io. of
//       console.log(message);
//       io.to(roomId).emit('createMessage', message, userId);
//     });
//   });
// });

connectDB(() => {
  server.listen(process.env.PORT || 3000, () => {
    console.log('Server on···');
  });
});
