// io(namespace);

const socket = io('/CHATROOM');
socket.on('connect', function () {
  console.log('connect');
});

socket.on('add-li', (msg) => {
  console.log(msg);
  const li = document.createElement('li');
  li['textContent'] = msg;
  document.querySelector('main#main').appendChild(li);
});
socket.emit('event1', 'initial event!');
// -----------------------------------
socket.emit('join-room', roomId);

function leaveRoom() {
  socket.emit('leave-room', roomId);
}

socket.on('message', (msg) => {
  console.log(msg);
  const div = document.createElement('div');
  div['textContent'] = msg;
  document.querySelector('main#main').appendChild(div);
});

function sendMessage() {
  console.log('A');
  console.log(socket);
  socket.emit('message', 'sendMessage!');
}
