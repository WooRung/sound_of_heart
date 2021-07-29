/**
 * 실습: 채팅서비스 구현.
 * [/videochat] Client Event
 * @event "message": message 전달
 */
const socket = io('/videochat');
let username;
username = '팬더';
socket.on('connect', function () {
  console.log('socket connect');
  socket.emit('join-room', ROOM_ID, username);
});

socket.on('message', (username, msg) => {
  const msg_html = createMessage(username, msg);
});
let send = document.getElementById('send');
send.addEventListener('click', (e) => {
  if (text.value.length !== 0) {
    // 클릭시 전송
    socket.emit('chat', text.value);
    text.value = '';
  }
});

let text = document.querySelector('#chat_message');
text.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && text.value.length !== 0) {
    // enter 입력시 전송
    socket.emit('chat', text.value);
    text.value = '';
  }
});

let messages = document.querySelector('.messages');

function sendMessage(msg) {
  socket.emit('chat', msg);
}

function createMessage(username, msg) {
  return;
  ``` <div class="message">
            <b><i class="far fa-user-circle"></i> <span> 
                      ${username}
                    </span> </b>
                    <span>${msg}</span>
                </div>
    ```;
}
