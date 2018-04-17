// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
let colorpicker = 0;
let colors = ["#00FFFF", "#7FFF00","#FFD700","#DC143C"]

wss.on('connection', (ws) => {
  console.log('Client connected');
  //assigns color
  ws.color = colors[(colorpicker%4)];
  colorpicker++;
  console.log(ws.color)

  //updates active users
  let clientUpdate = { type: "userUpdate", userCount: wss.clients.size }
  let outgoing = JSON.stringify(clientUpdate);
  wss.clients.forEach(function each(client) {
    client.send(outgoing);
  });


  //waits for incoming messages
  ws.on('message', function (incoming) {
    // parse
    let data = JSON.parse(incoming);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        data.id = uuidv1();
        if (data.type == 'postMessage') {
          data.type = 'incomingMessage';
        }
        if (data.type == 'postNotification') {
          data.type = 'incomingNotification'
        }
        //stringify
        data.color = ws.color;
        let outgoing = JSON.stringify(data)
        console.log(outgoing);
        client.send(outgoing);
      }
    });
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    let clientUpdate = { type: "userUpdate", userCount: wss.clients.size }
    let outgoing = JSON.stringify(clientUpdate);
    wss.clients.forEach(function each(client) {
      client.send(outgoing);
    });
  });
});