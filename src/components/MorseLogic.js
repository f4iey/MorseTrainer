// MorseLogic.js
export class MorseLogic {
  constructor() {
    this.KOCH_SEQUENCE = 'KMRSUAPTLOWI.NJEF0Y,VG5/Q9ZH38B?427C1D6X';
  }

  generateGroup(level, maxSize) {
    const availableChars = this.KOCH_SEQUENCE.slice(0, level);
    // Randomly select a size between 1 and maxSize
    const actualSize = Math.floor(Math.random() * maxSize) + 1;
    let group = '';
    for (let i = 0; i < actualSize; i++) {
      group += availableChars[Math.floor(Math.random() * availableChars.length)];
    }
    return group;
  }

  getAvailableChars(level) {
    return this.KOCH_SEQUENCE.slice(0, level);
  }

  getMaxLevel() {
    return this.KOCH_SEQUENCE.length;
  }
}
