const POSSIBLE_GAME_STATUS = {
  open: 'open',
  started: 'started' 
}

const letters = [
  'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',
  'B', 'B',
  'C', 'C', 'C',
  'D', 'D', 'D', 'D',
  'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E',
  'F', 'F',
  'G', 'G', 'G',
  'H', 'H', 'H', 'H', 'H', 'H',
  'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I',
  'J',
  'K',
  'L', 'L', 'L', 'L',
  'M', 'M', 'M',
  'N', 'N', 'N', 'N', 'N', 'N',
  'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O',
  'P', 'P',
  'Q',
  'R', 'R', 'R', 'R', 'R', 'R',
  'S', 'S', 'S', 'S', 'S', 'S',
  'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T',
  'U', 'U', 'U', 'U',
  'V', 'V',
  'W', 'W',
  'X',
  'Y', 'Y',
  'Z'
];

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
    this.boardSize = boardSize; // Board n x n
    this.roundsNumber = roundsNumber ?? 5; // Number of rounds
    this.duration = duration ?? 2; // Minutes
    this.status = POSSIBLE_GAME_STATUS.open;
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
    //this.board = new Array(this.boardSize).fill(new Array(this.boardSize).fill(0));
    for (let i = 0; i < this.boardSize; i++) {
      this.board.push([]);
      for (let j = 0; j < this.boardSize; j++) {
        this.board[i].push(letters[Math.floor(Math.random() * (letters.length))]);
      }
    }
  }
  start() {
    this.status = POSSIBLE_GAME_STATUS.started;
    this.generateBoard();
  }
}

module.exports = Game;