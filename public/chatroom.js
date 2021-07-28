// io(namespace);

const socket = io('/CHATROOM');
socket.on('connect', function () {
  console.log('connect');
});

function sendMessage() {
  const input = document.querySelector('input#msg');
  console.log(input.value);
  input.value = '';
}

function createMessagebox(msg) {
  const div = document.createElement('div');
  div.classList.add('msgbox');
  div['textContent'] = msg;
  document.querySelector('main#main').appendChild(div);
}
