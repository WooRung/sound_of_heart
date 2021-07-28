// io(namespace);
const username = prompt('닉네임 입력');

const socket = io('/CHATROOM');
socket.on('connect', function () {
  console.log('connect');

  alert(`${username}님이 로그인 하셨습니다.`);
});
socket.emit('join-room', roomId, username);

socket.on('msg:broad', (msg) => {
  console.log(msg);
  createMessagebox(`공지: ${msg}`);
});
socket.on('msg:get', (msg) => {
  console.log(msg);
  createMessagebox(msg);
});

function sendMessage() {
  const input = document.querySelector('input#msg');
  const data = input.value;
  input.value = '';
  socket.emit('msg:send', data);
  createMessagebox(`${username}: ${data}`);
}

function createMessagebox(msg) {
  const div = document.createElement('div');
  div.classList.add('msgbox');
  div['textContent'] = msg;
  document.querySelector('main#main').appendChild(div);
}
