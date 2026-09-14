import { StateClass } from "@/lib";

export default class HomeClass extends StateClass {
  constructor(state, setState) {
    super(state, setState);
    this.initState({
      simonSayGame: {
        sequence: [],
        currentLevel: 1,
        currentStreak: 0,
        currentScore: 0,
        isPlayerTurn: false,
        playerMove: null,
        hasStarted: false,
      },
    });
  }

  startGame() {
    console.log("startGame called");
    this.set(["simonSayGame", "hasStarted"], true).set(["simonSayGame", "currentLevel"], 1);
    this.generateSequencesByLevel();
    return this;
  }
  resetGame() {
    console.log("resetGame called");
    this.set(["simonSayGame", "hasStarted"], false).set(["simonSayGame", "currentLevel"], 1);
    return this;
  }

  generateSequencesByLevel() {
    const currentLevel = this.get(["simonSayGame", "currentLevel"]);
    const newSequence = Array.from({ length: currentLevel }, () => Math.floor(Math.random() * 4) + 1);
    this.set(["simonSayGame", "sequence"], newSequence);
    return this;
  } 
  playGame() {
    const sequence = this.get(["simonSayGame", "sequence"]);
    const currentLevel = this.get(["simonSayGame", "currentLevel"]);
    const isPlayerTurn = this.get(["simonSayGame", "isPlayerTurn"]);

    if (!isPlayerTurn) {
      sequence.push(Math.floor(Math.random() * 4) + currentLevel);
      this.set(["simonSayGame", "sequence"], sequence);
    }
    this.set(["simonSayGame", "isPlayerTurn"], !isPlayerTurn);
    return this;
  }

  
  validatePlayerMove(playerMove) {
    const sequence = this.get(["simonSayGame", "sequence"]);
    const currentLevel = this.get(["simonSayGame", "currentLevel"]);
    const isPlayerTurn = this.get(["simonSayGame", "isPlayerTurn"]);


    console.log("validatePlayerMove called with playerMove:", playerMove, "expectedMove:", sequence[sequence.length - 1]);
    if (!isPlayerTurn) {
      return this;
    }

    const expectedMove = sequence[sequence.length - 1];
    const isValid = playerMove === expectedMove;

    if (isValid) {
      this.set(["simonSayGame", "currentStreak"], this.get(["simonSayGame", "currentStreak"]) + 1);
      this.set(["simonSayGame", "currentScore"], this.get(["simonSayGame", "currentScore"]) + 1);
    } else {
      this.set(["simonSayGame", "currentStreak"], 0);
    }

    this.set(["simonSayGame", "isPlayerTurn"], !isPlayerTurn);
    return this;
  }

  static init(state, setState) {
    return new HomeClass(state, setState);
  }
}
