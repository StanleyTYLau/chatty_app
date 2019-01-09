// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const http = require('http');
const uuid = require('uuid/v4');

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
  console.log('Client connected');

  ws.on('message', data => {
    const objData = JSON.parse(data);
    console.log(`Got message from the User: ${objData.username} said ${objData.content}`);

    const objectToBroadcast = {
              id: uuid(),
              //date: new Date(),
              content: objData.content,
              username: objData.username,
              type: 'text-message'
    };

    wss.broadcastJSON(objectToBroadcast);

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
