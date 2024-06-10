import Chat from './Chat';

const root = document.getElementById('root');

const app = new Chat(root);

//app.init();
const ws = new WebSocket('ws://http://localhost:7070');

ws.addEventListener('open', (e) => {
    console.log(e);
    
    console.log('ws open');
  });

ws.addEventListener('close', (e) => {
    console.log(e);
    
    console.log('ws close');
});
  
ws.addEventListener('error', (e) => {
    console.log(e);
    
    console.log('ws error');
});