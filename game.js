const POSSIBLE_GAME_STATES = {
  open: 'open',
  started: 'started' 
}

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class Player {
  constructor ({name}) {
    this.name = name;
    this.points = 0;
  }
  icrementPoints(points) {
    this.points += points;
  }
}

class Game {
  constructor ({boardSize, roundsNumber, duration, state}) {
    this.boardSize = boardSize ?? 4; // Board n x n
    this.roundsNumber = roundsNumber ?? 5; // Number of rounds
    this.duration = duration ?? 2; // Minutes
    this.state = POSSIBLE_GAME_STATES.open;
    this.players = {}
    this.board = []
  }
  addPlayer(playerData) {
    const player = new Player(playerData);

    //Assign id to player
    let playerId;
    for (let i = 1; i < 30000; i++) {
      if (this.players[i] == undefined) {
        this.players[i] = player;
        playerId = i;
        break;
      }
    }
    return playerId;
  }
  generateBoard() {
    this.board = Array(this.boardSize).fill(Array(this.boardSize));
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        this.board[i][j] = letters[Math.floor(Math.random() * (letters.length - 0 + 1) + 0)]
      }
    }
  }
  start() {
    //Code
    this.state = POSSIBLE_GAME_STATES.started;
  }
}

module.exports = Game;