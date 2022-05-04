/**
 * 실습: 채팅서비스 구현.
 * [/videochat] Client Event
 * @event "message": message 전달
 */
const socket = io('/videochat');
let username;
let user = localStorage['user'];
if (user) {
  user = JSON.parse(user);
  username = user.nickName || user.email;
} else {
  username = prompt('이름 입력');
}

const videoGrid = document.querySelector('#video-grid');
const videoElem = document.createElement('video');

const peer = new Peer(undefined, {
  // path: '/peerjs/videochat',
  // host: '/',
  // port: '3000',
  // debug: 4,
});

/**
 * [Init]
 * 1. 자신의 카메라의 myStream을 받아온다.
 * 2. myStream을 video element에 추가하여 재생한다.
 * 3. 다른 피어의 연결을 대기하는 event 추가.
 *
 * [다른 peer가 연결했을때 (다른 peer가 call 했을 경우)]
 * 1. peer에 응답을 준다. (myStream)
 * 2. peer로부터 stream을 받는 이벤트리스너를 등록
 *
 * [다른 peer를 call할 때]
 * 1. peer로 call 한다.
 * 2. peer로 stream을 받는 이벤트리스너 등록
 */
function isValidVideo(useTime) {
  return new Promise(function (resolve, reject) {
    return fetch('/api/videolimit', {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify({ useTime }),
    })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
let myTimer;

navigator.mediaDevices
  .getUserMedia({
    video: true,
  })
  .then((stream) => {
    addVideo(videoElem, stream);
    peer.on('call', (call) => {
      console.log('peer call');
      call.answer(stream);

      const newVideoElem = document.createElement('video');
      call.on('stream', (remoteStream) => {
        myTimer = setInterval(() => {
          isValidVideo(10)
            .then((data) => {
              return data.text();
            })
            .then((data) => {
              if (data !== 'ok') {
                alert('만료');
              }
            });
        }, 10000);
        addVideo(newVideoElem, remoteStream);
      });
      call.on('close', () => {
        clearInterval(myTimer);
        newVideoElem.remove();
      });
    });
    socket.on('user-connected', (peerId) => {
      // 다른 유저가 연결? ==> 해당 유저의 peer를 call!
      console.log('user-connected', peerId);
      const newVideoElem = document.createElement('video');

      const call = peer.call(peerId, stream);

      call.on('stream', (remoteStream) => {
        myTimer = setInterval(() => {
          isValidVideo(10)
            .then((data) => {
              return data.text();
            })
            .then((data) => {
              if (data !== 'ok') {
                alert('만료');
              }
            });
        }, 10000);
        addVideo(newVideoElem, remoteStream);
      });
      call.on('close', () => {
        clearInterval(myTimer);
        newVideoElem.remove();
      });
      // call.on('stream', (remoteStream) => {
      //   addVideo(newVideoElem, remoteStream);
      // });
    });

    // 다른 peer를 call할 때 (peerId)
  });

// navigator.mediaDevices
//   .getUserMedia({
//     video: true,
//   })
//   .then((stream) => {
//     addVideo(videoElem, stream);

//     userVideoStream = stream;

//     // peer event listener
//     // (call이 왔을 때 ==> 다른 피어가 같은 ROOM에 접속했을 때)
//     peer.on('call', (call) => {
//       console.log('call');
//       call.answer(stream);
//       call.on('stream', (remoteStream) => {
//         console.log("get peer's stream");
//         const newVideoElem = document.createElement('video');
//         addVideo(newVideoElem, remoteStream);
//       });
//     });

//     socket.on('user-connected', (peerId) => {
//       console.log('user-connected');
//       console.log(userVideoStream);

//       const call = peer.call(peerId, userVideoStream);
//       console.log(call);
//       console.log(peerId);
//       call.on('stream', (remoteStream) => {
//         console.log("get Peer's answer");
//         const newVideoElem = document.createElement('video');
//         addVideo(newVideoElem, remoteStream);
//       });
//     });
//   });
peer.on('open', (peerId) => {
  console.log('peer opend! peerId: ', peerId);
  socket.emit('join-room', ROOM_ID, username, peerId);
});

function addVideo(videoElem, stream) {
  console.log('add Video');
  videoElem.srcObject = stream;
  videoGrid.append(videoElem);
  videoElem.addEventListener('loadedmetadata', () => {
    videoElem.play();
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
