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
/**
 * Initialize express application
 */

const app = require('express')();

const http = require('http');

const server = http.createServer(app);

const io = SocketIO(server, {
  cors: {
    origin: '*',
  },
  path: '/socket.io',
  transports: ['websocket', 'polling'],
});
app.set('io', io);
const configApp = require('./src/app');
configApp(app);

const Peer = require('peer');
const peerServer = Peer.ExpressPeerServer(server, {
  path: '/videochat',
  debug: true,
});
app.use('/peerjs', peerServer);

const sock = require('./socketio');
sock(io);

const errorHandler = require('./src/error_handler');
errorHandler(app);

connectDB(() => {
  server.listen(process.env.PORT || 3000, () => {
    console.log('Server on···');
  });
});
