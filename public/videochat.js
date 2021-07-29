let messages = document.querySelector('.messages');
let send = document.getElementById('send');
send.addEventListener('click', (e) => {
  if (text.value.length !== 0) {
    // 클릭시 전송
  }
});
let text = document.querySelector('#chat_message');
text.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && text.value.length !== 0) {
    // enter 입력시 전송
  }
});
```
<div class="message">
                <b><i class="far fa-user-circle"></i> <span> 
                  username
                </span> </b>
                <span>message</span>
            </div>

```;
