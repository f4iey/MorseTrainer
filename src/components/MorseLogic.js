// MorseLogic.js
export class MorseLogic {
  constructor() {
    this.KOCH_SEQUENCE = 'KMRSUAPTLOWI.NJEF0Y,VG5/Q9ZH38B?427C1D6X';
    this.currentSequence = this.KOCH_SEQUENCE;
  }

  shuffleSequence() {
    const array = this.KOCH_SEQUENCE.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    this.currentSequence = array.join('');
  }

  resetSequence() {
    this.currentSequence = this.KOCH_SEQUENCE;
  }

  generateGroup(level, maxSize) {
    const availableChars = this.currentSequence.slice(0, level);
    const actualSize = Math.floor(Math.random() * maxSize) + 1;
    let group = '';
    for (let i = 0; i < actualSize; i++) {
      group += availableChars[Math.floor(Math.random() * availableChars.length)];
    }
    return group;
  }

  getAvailableChars(level) {
    return this.currentSequence.slice(0, level);
  }

  getMaxLevel() {
    return this.KOCH_SEQUENCE.length;
  }
}
