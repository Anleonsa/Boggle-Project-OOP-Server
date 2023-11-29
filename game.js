const POSSIBLE_GAME_STATUS = {
  open: 'open',
  running: 'running',
  betweenRounds: 'betweenRounds',
  finished: 'finished'
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

// Values of words in relation with its lengths
const getPoints = (wordLength) => {
  switch (wordLength) {
    case 3:
    case 4: return 1;
    case 5: return 2;
    case 6: return 3;
    case 7: return 5;
    default: return 11
  }
}

class Player {
  constructor ({name}) {
    this.name = name;
    this.points = 0;
    this.roundPoints = 0;
    this.words = [];
  }
  incrementPoints(points) {
    this.points += points;
  }
  set setRoundPoints(points) {
    this.roundPoints = points;
  }
}

class Game {
  constructor ({boardSize, roundsNumber, duration}) {
    this.id;
    this.emit;
    this.boardSize = boardSize; // Board n x n
    this.roundsNumber = parseInt(roundsNumber) ?? 5; // Number of rounds
    this.duration = duration ?? 2; // Minutes
    this.currentRound = 1;
    this.status = POSSIBLE_GAME_STATUS.open;
    this.players = {};
    this.board = [];
    this.timeLeft = 0;
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
    this.board = []
    for (let i = 0; i < this.boardSize; i++) {
      this.board.push([]);
      for (let j = 0; j < this.boardSize; j++) {
        this.board[i].push(letters[Math.floor(Math.random() * (letters.length))]);
      }
    }
  }
  incrementRound() {
    this.currentRound++;
  }
  initTimer() {
    this.timeLeft = this.duration * 60;
    let timer = setInterval(() => {
      this.timeLeft--;
      this.emit(this.id);
      if (this.timeLeft <= 0) {
        clearInterval(timer);
        this.finishRound();
      }
    }, 1000);
  }
  startGame() {
    this.status = POSSIBLE_GAME_STATUS.running;
    this.generateBoard();
    this.initTimer();
  }
  finishRound() {
    this.status = POSSIBLE_GAME_STATUS.betweenRounds;

    //Counting points
    for(const player of Object.values(this.players)) {
      let pointsSumatory = 0;
      for (const word of player.words) pointsSumatory += getPoints(word.length);
      player.incrementPoints(pointsSumatory);
      player.setRoundPoints = pointsSumatory;
    }
    this.emit(this.id);

    let tempCounter = 15;
    let timer = setInterval(() => {
      tempCounter--;
      if (tempCounter <= 0) {
        clearInterval(timer);
        for (const player of Object.values(this.players)) {
          player.words = [];
        }

        if (this.currentRound === this.roundsNumber) {
          this.finishGame();
        }
        else {
          this.incrementRound();
          this.startGame();
        }
      }
    }, 1000);
  }
  finishGame() {
    this.status = POSSIBLE_GAME_STATUS.finished;
    this.emit(this.id);
  }
}

module.exports = Game;
