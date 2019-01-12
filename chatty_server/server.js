// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const http = require('http');
const uuid = require('uuid/v4');
const messageDB = [];
let numUser = 0;
const colours = ['#2813b0','#7712ad','#1281ad','#b5165b','#ad15a3','#b37a10','#33ad1d'];

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const app = express();
   // Make the express server serve static assets (html, javascript, css) from the /public folder
// app.use(express.static('public'));
// app.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Chatty Server listening on ${ PORT }`));

app.get('/', (req, res) => {
  res.send('Chatty App Socket Server!');
});

// Create the WebSockets server
const server = http.createServer(app);
const wss = new SocketServer({ server });

//Broadcast to all function
wss.broadcast = (data) => {
  wss.clients.forEach( (client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.broadcastJSON = obj => wss.broadcast(JSON.stringify(obj));

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  //New user ENTERS chatroom - update all user counts.
  numUser++;
  wss.broadcastJSON({userCount: wss.clients.size, type: 'update-userCount'});

  //New users receive all previous messages.
  const initialMessage = {
    type: 'initial-messages',
    messages: messageDB,
    currentUser: `Anon${numUser}`,
    fontColour: colours[wss.clients.size%7]
  };
  ws.send(JSON.stringify(initialMessage));

  ws.on('message', data => {
    const objData = JSON.parse(data);

     const objectToBroadcast = {
      id: uuid(),
      content: objData.content,
      username: objData.username,
      fontColour: objData.fontColour,
      type: ''
    };

    switch (objData.type){
      case 'post-message':
        objectToBroadcast.type = 'post-message';
        messageDB.push(objectToBroadcast);
        wss.broadcastJSON(objectToBroadcast);
        break;
      case 'post-notification':
        objectToBroadcast.type = 'post-notification';
        messageDB.push(objectToBroadcast);
        wss.broadcastJSON(objectToBroadcast);
        break;
      default:
    }


  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    //User EXITS chatroom - update all user counts.
    wss.broadcastJSON({userCount: wss.clients.size, type: 'update-userCount'});
    return console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
