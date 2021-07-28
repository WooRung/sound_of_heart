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
