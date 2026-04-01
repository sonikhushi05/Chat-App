const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

let users = new Set();

wss.on('connection', ws => {
  ws.on('message', message => {
    const data = JSON.parse(message);

    if (users.has(data.username)) {
      ws.send(JSON.stringify({ error: "Username taken" }));
      return;
    }

    users.add(data.username);

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });
});