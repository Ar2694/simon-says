import { StateClass } from "@/lib";

export default class HomeClass extends StateClass {
  constructor(state, setState) {
    super(state, setState);
    this.initState({
      simonSayGame: {
        sequence: [],
        currentSequenceIndex: 0,
        currentLevel: 4,
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

  /**
   * Shared methods used internally within the class.
   */
  generateSequencesByLevel() {
    const currentLevel = this.get(["simonSayGame", "currentLevel"]);
    const newSequence = Array.from({ length: currentLevel }, () => Math.floor(Math.random() * 4) + 1);
    this.set(["simonSayGame", "sequence"], newSequence);
    return this;
  }

  /**
   * List of click handlers that can be triggered externally.
   */

  startGame = (state, setState) => {
    console.log("startGame called");
    this.bind(state, setState);
    this.set(["simonSayGame", "hasStarted"], true);
    this.generateSequencesByLevel();
    this.commit();
    return this;
  };
  resetGame = (state, setState) => {
    console.log("resetGame called");
    this.bind(state, setState);
    this.initState({
      simonSayGame: {
        sequence: [],
        currentSequenceIndex: 0,
        currentLevel: 4,
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
    this.commit();
    return this;
  };

  /**
   * List of effects that can be triggered externally.
   */
  playSequence = (state, setState) => {
    this.bind(state, setState);
    const sequence = this.get(["simonSayGame", "sequence"]);
    const currentSequenceIndex = this.get(["simonSayGame", "currentSequenceIndex"]);

    console.log("Playing sequence at index:", sequence, currentSequenceIndex);
    if (currentSequenceIndex < sequence.length) {
      const step = sequence[currentSequenceIndex];

      if (step === 1) {
        this.set(["simonSayGame", "btn1", "active"], true).commit();
        setTimeout(() => {
          this.set(["simonSayGame", "btn1", "active"], false).commit();
        }, 500);
      } else if (step === 2) {
        this.set(["simonSayGame", "btn2", "active"], true).commit();
        setTimeout(() => {
          this.set(["simonSayGame", "btn2", "active"], false).commit();
        }, 500);
      } else if (step === 3) {
        this.set(["simonSayGame", "btn3", "active"], true).commit();
        setTimeout(() => {
          this.set(["simonSayGame", "btn3", "active"], false).commit();
        }, 500);
      } else if (step === 4) {
        this.set(["simonSayGame", "btn4", "active"], true).commit();
        setTimeout(() => {
          this.set(["simonSayGame", "btn4", "active"], false).commit();
        }, 500);
      }

      this.set(["simonSayGame", "currentSequenceIndex"], currentSequenceIndex + 1);
    } else {
      console.log("Sequence completed");
      this.set(["simonSayGame", "isPlayerTurn"], true);
      this.set(["simonSayGame", "currentSequenceIndex"], 0);
    }
    this.commit();
    return this;
  };

  /**
   * Returns the effects (methods) that can be triggered externally.
   */
  getEffects() {
    return {
      playSequence: this.playSequence,
    };
  }

  /**
   * Returns the clicks (methods) that can be triggered externally.
   */
  getClicks() {
    return {
      startGame: this.startGame,
      resetGame: this.resetGame,
    };
  }

  static init(state, setState) {
    return new HomeClass(state, setState);
  }
}
