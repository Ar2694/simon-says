import { StateClass } from "@/lib";

export default class HomeClass extends StateClass {
  constructor(state, setState) {
    super(state, setState);

    this.defaultState = {
      simonSayGame: {
        sequence: [],
        currentSequenceIndex: 0,
        currentLevel: 1,
        currentStreak: 0,
        currentScore: 0,
        isPlayerTurn: false,
        hasStarted: false,
        isGameOver: false,
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
      gameOverModal: {
        open: false,
      },
      nextLevelModal: {
        open: false,
      },
    };

    this.initState(this.defaultState);
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
    this.bind(state, setState);
    this.set(["simonSayGame", "hasStarted"], true);
    this.generateSequencesByLevel();
    this.commit();
    return this;
  };

  resetToDefault() {
    this.initState(this.defaultState);
    this.commit();
    return this;
  }

  resetGame = (state, setState) => {
    this.bind(state, setState);
    this.initState(this.defaultState);
    this.commit();
    return this;
  };

  validatePlayerMove = (state, setState, id) => {
    this.bind(state, setState);
    const sequence = this.get(["simonSayGame", "sequence"]);
    const currentSequenceIndex = this.get(["simonSayGame", "currentSequenceIndex"]);
    const currentLevel = this.get(["simonSayGame", "currentLevel"]);
    const currentStreak = this.get(["simonSayGame", "currentStreak"]);
    const currentScore = this.get(["simonSayGame", "currentScore"]);

    if (id === sequence[currentSequenceIndex]) {
      this.set(["simonSayGame", "currentSequenceIndex"], currentSequenceIndex + 1);
      if (currentLevel === currentSequenceIndex + 1) {
        this.set(["nextLevelModal", "open"], true);
        this.set(["simonSayGame", "currentLevel"], currentLevel + 1);
        this.set(["simonSayGame", "currentStreak"],  currentStreak + 1);
        this.set(["simonSayGame", "currentScore"], currentScore + 10);
        this.set(["simonSayGame", "currentSequenceIndex"], 0);
        this.generateSequencesByLevel();
      }
    } else {
      this.resetToDefault();
      this.set(["gameOverModal", "open"], true);
    }
    this.commit();
  };


  closeGameOverModal = (state, setState) => {
    this.bind(state, setState);
    this.set(["gameOverModal", "open"], false);
    this.commit();
  };
  closeNextLevelModal = (state, setState) => {
    this.bind(state, setState);
    this.set(["nextLevelModal", "open"], false);
    this.set(["simonSayGame", "isPlayerTurn"], false);
    this.commit();
  };
  /**
   * List of effects that can be triggered externally.
   */
  playSequence = (state, setState) => {
    this.bind(state, setState);
    const sequence = this.get(["simonSayGame", "sequence"]);
    const currentSequenceIndex = this.get(["simonSayGame", "currentSequenceIndex"]);

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
      this.set(["simonSayGame", "isPlayerTurn"], true);
      this.set(["simonSayGame", "currentSequenceIndex"], 0);
    }
    this.commit();
    return this;
  };


  getController() {
    return {
      effects: {
        playSequence: this.playSequence,
      },
      clicks: {
        startGame: this.startGame,
        resetGame: this.resetGame,
        validatePlayerMove: this.validatePlayerMove,
        closeGameOverModal: this.closeGameOverModal,
        closeNextLevelModal: this.closeNextLevelModal,
      },
    };
  }

  static init(state, setState) {
    return new HomeClass(state, setState);
  }
}
