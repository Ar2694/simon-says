import { StateClass } from "asnow-lib";

export default class HomeClass extends StateClass {
  constructor(state, setState) {
    super(state, setState);

    this.audioContext = null;

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
      infoModal: {
        open: false,
      },
      resetGameModal: {
        open: false,
      },
    };

    this.initState(this.defaultState);
  }

  /**
   * Shared methods used internally within the class.
   */
  getAudioContext() {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;

    if (!AudioCtor) {
      return null;
    }

    if (!this.audioContext) {
      this.audioContext = new AudioCtor();
    }

    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }

    return this.audioContext;
  }

  playTone(frequency, duration = 0.18, volume = 0.08) {
    const ctx = this.getAudioContext();

    if (!ctx) {
      return;
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gainNode.gain.value = volume;
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  }

  playButtonSound(id) {
    const tones = {
      1: 261.63,
      2: 329.63,
      3: 392.0,
      4: 493.88,
    };

    this.playTone(tones[id] ?? 440, 0.18, 0.07);
  }

  playErrorSound() {
    this.playTone(180, 0.28, 0.08);
    setTimeout(() => this.playTone(120, 0.35, 0.08), 120);
  }

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
    this.playButtonSound(id);

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
        this.set(["simonSayGame", "currentStreak"], currentStreak + 1);
        this.set(["simonSayGame", "currentScore"], currentScore + 10);
        this.set(["simonSayGame", "currentSequenceIndex"], 0);
        this.generateSequencesByLevel();
      }
    } else {
      this.playErrorSound();
      this.resetToDefault();
      this.set(["gameOverModal", "open"], true);
    }
    this.commit();
  };

  closeResetGameModal = (state, setState) => {
    this.bind(state, setState);
    this.set(["resetGameModal", "open"], false);
    this.commit();
    return this;
  };
  openResetGameModal = (state, setState) => {
    this.bind(state, setState);
    this.set(["resetGameModal", "open"], true);
    this.commit();
    return this;
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
  closeInfoModal = (state, setState) => {
    this.bind(state, setState);
    this.set(["infoModal", "open"], false);
    this.commit();
  };

  openInfoModal = (state, setState) => {
    this.bind(state, setState);
    this.set(["infoModal", "open"], true);
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
        this.playButtonSound(1);
        this.set(["simonSayGame", "btn1", "active"], true).commit();
        setTimeout(() => {
          this.set(["simonSayGame", "btn1", "active"], false).commit();
        }, 500);
      } else if (step === 2) {
        this.playButtonSound(2);
        this.set(["simonSayGame", "btn2", "active"], true).commit();
        setTimeout(() => {
          this.set(["simonSayGame", "btn2", "active"], false).commit();
        }, 500);
      } else if (step === 3) {
        this.playButtonSound(3);
        this.set(["simonSayGame", "btn3", "active"], true).commit();
        setTimeout(() => {
          this.set(["simonSayGame", "btn3", "active"], false).commit();
        }, 500);
      } else if (step === 4) {
        this.playButtonSound(4);
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
        closeInfoModal: this.closeInfoModal,
        openInfoModal: this.openInfoModal,
        closeResetGameModal: this.closeResetGameModal,
        openResetGameModal: this.openResetGameModal,
      },
    };
  }

  static init(state, setState) {
    return new HomeClass(state, setState);
  }
}
