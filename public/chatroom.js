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
  createMessagebox(`공지: ${msg}`, 'notice');
});
socket.on('msg:get', (msg) => {
  console.log(msg);
  createMessagebox(msg, 'normal');
});

function sendMessage() {
  const input = document.querySelector('input#msg');
  const data = input.value;
  input.value = '';
  socket.emit('msg:send', data);
  createMessagebox(`${username}: ${data}`, 'my');
}

function createMessagebox(msg, type = 'normal') {
  const div = document.createElement('div');
  const p = document.createElement('p');
  div.appendChild(p);
  p.classList.add('msgbox');
  p['textContent'] = msg;
  switch (type) {
    case 'normal':
      p.classList.add('normal');
      break;
    case 'notice':
      p.classList.add('notice');
      break;
    case 'my':
      p.classList.add('my');
      break;
  }
  document.querySelector('main#main').appendChild(div);
}
