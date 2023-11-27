const http = require('http');
const Game = require('./game');
const server = http.createServer();

const io = require('socket.io')(server, {
  cors: {origin: '*'}
});

const games = {};

io.on('connection', (socket) => {
  //console.log('Connected client');

  socket.on('user-info', data => {
    console.log(data.user);
  })

  io.emit('data-games', games);

  //Listener to create a game
  socket.on('create-game', data => {
    const game = new Game(data.game);

    //Assign id to the game
    let gameId;
    for (let i = 1; i < 30000; i++) {
      if (games[i] == undefined) {
        games[i] = game;
        gameId = i;
        break;
      }
    }
    io.emit(data.creator, gameId);
    io.emit('data-games', games);
  })

  //Listener to add player
  socket.on('add-player', data => {
    const playerId = games[data.room].addPlayer(data.playerData);
    io.emit(data.connectionId, playerId);
    io.emit(`game-${data.room}`, games[data.room]);
  })

  socket.on('sync-game', data => {
    io.emit(`game-${data.room}`, games[data.room]);
  })

});

server.listen(8080);
