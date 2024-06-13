const ws = new WebSocket('ws://localhost:7070');

const root = document.getElementById('root');
const enter = document.querySelector('.enter');
const nicknameEnter = document.getElementById('nicknameInputEnter');
const nickname = document.getElementById('nicknameInput');
const enterButton =document.getElementById('enterButton')
const sendButton = document.getElementById('sendButton');
const refreshButton = document.getElementById('refreshButton');
const errorText = document.getElementById('errorText');
const onlineClientsDiv = document.getElementById('onlineUsers');
const chatArea = document.getElementById('chatArea');


ws.onopen = function open() {
    console.log('Connected to the server');
    
    enterButton.addEventListener('click', function() {
        enter.classList.add('hidden');
        root.classList.remove('hidden');
        errorText.classList.add('hidden');
        nickname.value = nicknameEnter.value;
        ws.send(JSON.stringify(`Ник:${nickname.value}`));
        ws.send(JSON.stringify('Подключение'));
    });
    
    sendButton.addEventListener('click', function() {
        const message = document.getElementById('messageInput');
        ws.send(JSON.stringify(`${nickname.value}: ${message.value}`));
        message.value = "";
    });

};
  
ws.onmessage = function incoming(event) {
    const messageReturned = event.data;
    const separatorIndex = messageReturned.indexOf(':');
    if (messageReturned.includes('Такой псевдоним уже занят')) {
        errorText.classList.remove('hidden');
        enter.classList.remove('hidden');
        root.classList.add('hidden');
    } else if(messageReturned.includes('Онлайн:')) { 
        onlineClientsDiv.innerHTML = '';
        const online = messageReturned.slice(separatorIndex + 1);
        let onlineArr = online.split(', ');
        onlineArr.forEach((element) => {
            if (element === nickname.value) {
                onlineClientsDiv.innerHTML += `<p class="youOnline"> Вы </p>`;
            } else {
                onlineClientsDiv.innerHTML += `<p>${element}</p>`;
            };
        });
        
    } else {
        const nickReturned = messageReturned.slice(0, separatorIndex);
        const messReturned = messageReturned.slice(separatorIndex + 1);
        if (nickReturned === nickname.value) {
            chatArea.innerHTML += `<p class="right">Вы:${messReturned}</p>`;
        } else {
            chatArea.innerHTML += `<p class="left">${messageReturned}</p>`;
        };
        
    }
};

ws.onclose = function close() {
    console.log('Disconnected from the server');
};