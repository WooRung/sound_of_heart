/**
 * 실습: 채팅서비스 구현.
 * [/videochat] Client Event
 * @event "message": message 전달
 */
const socket = io('/videochat');
let username;
username = '팬더';

const videoGrid = document.querySelector('#video-grid');
const videoElem = document.createElement('video');

let userVideoStream;
const peer = new Peer(undefined, {
  path: '/peerjs/videochat',
  host: '/',
  port: '3000',
  debug: 4,
});
let myPeerId;

peer.on('open', (peerId) => {
  myPeerId = peerId;
  console.log('peer opend! peerId: ', peerId);
  socket.emit('join-room', ROOM_ID, username, myPeerId);
});

navigator.mediaDevices
  .getUserMedia({
    video: true,
  })
  .then((stream) => {
    // console.log(stream);
    userVideoStream = stream;
    addVideo(videoElem, stream);

    peer.on('call', (call) => {
      const newVideo = document.createElement('video');
      call.on('stream', (videoStream) => {
        console.log('stream1');

        addVideo(newVideo, videoStream);
      });
    });

    socket.on('user-connected', (peerId) => {
      const call = peer.call(peerId, userVideoStream);

      const newVideo = document.createElement('video');
      call.on('stream', (videoStream) => {
        console.log('stream2');
        addVideo(newVideo, videoStream);
      });
    });
  })
  .catch((err) => {
    console.error(err);
  });

function addVideo(videoElem, stream) {
  console.log('add Video');
  videoElem.srcObject = stream;
  videoElem.addEventListener('loadedmetadata', () => {
    videoElem.play();
    videoGrid.append(videoElem);
  });
}

/**
 * socket.io 영역
 */

let messages = document.querySelector('.messages');

// socket.on('connect', function () {
//   console.log('socket connect');
// });

socket.on('message', (username, msg) => {
  const msg_html = createMessage(username, msg);
  messages.innerHTML += msg_html;
});
let send = document.getElementById('send');
send.addEventListener('click', (e) => {
  if (text.value.length !== 0) {
    // 클릭시 전송
    sendMessage(text.value);
    text.value = '';
  }
});

let text = document.querySelector('#chat_message');
text.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && text.value.length !== 0) {
    // enter 입력시 전송
    sendMessage(text.value);
    text.value = '';
  }
});

function sendMessage(msg) {
  socket.emit('chat', msg);
}

function createMessage(username, msg) {
  return `<div class="message">
            <b><i class="far fa-user-circle"></i> 
            <span> ${username}</span>
            </b><span>
            ${msg}</span></div>`;
}
