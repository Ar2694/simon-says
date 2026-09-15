import { StateClass } from "@/lib";
import { act } from "react";

export default class HomeClass extends StateClass {
  constructor(state, setState) {
    super(state, setState);
    this.initState({
      simonSayGame: {
        sequence: [],
        currentSequenceIndex: 0,
        currentLevel:4,
        currentStreak: 0,
        currentScore: 0,
        isPlayerTurn: false,
        playerMove: null,
        hasStarted: false,
        btn1: {
          active: false,
        },
        btn2: {
          active: false,
        },
        btn3: {
          active: false,
        },
        btn4: {
          active: false,
        },
      },
    });
  }

  startGame() {
    console.log("startGame called");
    this.set(["simonSayGame", "hasStarted"], true);
    this.generateSequencesByLevel();
    return this;
  }
  resetGame() {
    console.log("resetGame called");
      this.initState({
      simonSayGame: {
        sequence: [],
        currentSequenceIndex: 0,
        currentLevel:4,
        currentStreak: 0,
        currentScore: 0,
        isPlayerTurn: false,
        playerMove: null,
        hasStarted: false,
        btn1: {
          active: false,
        },
        btn2: {
          active: false,
        },
        btn3: {
          active: false,
        },
        btn4: {
          active: false,
        },
      },
    });
    return this;
  }

  generateSequencesByLevel() {
    const currentLevel = this.get(["simonSayGame", "currentLevel"]);
    const newSequence = Array.from({ length: currentLevel }, () => Math.floor(Math.random() * 4) + 1);
    this.set(["simonSayGame", "sequence"], newSequence);
    return this;
  }

  playSequence(callback) {
   
    const sequence = this.get(["simonSayGame", "sequence"]);
    const currentSequenceIndex = this.get(["simonSayGame", "currentSequenceIndex"]);

    if (currentSequenceIndex < sequence.length) {
      const step = sequence[currentSequenceIndex];
      if (callback) {
        callback(step, currentSequenceIndex);
      }
      console.log(`Playing sequence step ${currentSequenceIndex + 1}: ${step}`, sequence);
      this.set(["simonSayGame", "currentSequenceIndex"], currentSequenceIndex + 1);
    } else {
      console.log("Sequence completed");
      this.set(["simonSayGame", "isPlayerTurn"], true);
    }

    return this;
  }

  static init(state, setState) {
    return new HomeClass(state, setState);
  }
}
