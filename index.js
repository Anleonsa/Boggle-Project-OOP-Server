const http = require('http');

const server = http.createServer();

const io = require('socket.io')(server, {
  cors: {origin: '*'}
});

io.on('connection', (socket) => {
  console.log('Connected client');
});

server.listen(8080);
