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
  //   debug: 4,
});
let myPeerId;

navigator.mediaDevices
  .getUserMedia({
    video: true,
  })
  .then((stream) => {
    addVideo(videoElem, stream);

    userVideoStream = stream;

    // peer event listener
    // (call이 왔을 때 ==> 다른 피어가 같은 ROOM에 접속했을 때)
    peer.on('call', (call) => {
      console.log('call');
      call.answer(stream);
      call.on('stream', (remoteStream) => {
        console.log("get peer's stream");
        const newVideoElem = document.createElement('video');
        addVideo(newVideoElem, remoteStream);
      });
    });

    socket.on('user-connected', (peerId) => {
      console.log('user-connected');
      console.log(userVideoStream);

      const call = peer.call(peerId, userVideoStream);
      console.log(call);
      console.log(peerId);
      call.on('stream', (remoteStream) => {
        console.log("get Peer's answer");
        const newVideoElem = document.createElement('video');
        addVideo(newVideoElem, remoteStream);
      });
    });
  });
peer.on('open', (peerId) => {
  myPeerId = peerId;
  console.log('peer opend! peerId: ', peerId);
  socket.emit('join-room', ROOM_ID, username, peerId);
});
// navigator.mediaDevices
//   .getUserMedia({
//     video: true,
//   })
//   .then((stream) => {
//     // console.log(stream);
//     userVideoStream = stream;
//     addVideo(videoElem, stream);

//     peer.on('call', (call) => {
//       call.answer(stream);

//       const newVideo = document.createElement('video');
//       call.on('stream', (videoStream) => {
//         console.log('stream1');

//         addVideo(newVideo, videoStream);
//       });
//     });

//     socket.on('user-connected', (peerId) => {
//       const call = peer.call(peerId, userVideoStream);
//       console.log('user-connected');
//       console.log(call);
//       const newVideo = document.createElement('video');
//       call.on('stream', (videoStream) => {
//         console.log('stream2');
//         addVideo(newVideo, videoStream);
//       });
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });

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
