// MorseSequences.js
export const SEQUENCE_PRESETS = {
  KOCH: {
    id: 'koch',
    name: 'Koch Method',
    sequence: 'KMRSUAPTLOWI.NJEF0Y,VG5/Q9ZH38B?427C1D6X',
    type: 'character'
  },
  QCODES: {
    id: 'qcodes',
    name: 'Common Q-Codes',
    sequence: [
      'QRL', 'QRM', 'QRN', 'QRO', 'QRP', 'QRQ', 'QRS', 'QRT', 'QRU', 'QRV',
      'QRX', 'QRZ', 'QSB', 'QSL', 'QSO', 'QSY', 'QTH', 'QST'
    ],
    type: 'phrase'
  },
  CUT_NUMBERS: {
    id: 'cut_numbers',
    name: 'Cut Numbers',
    sequence: [
      'T', 'A', 'U', 'V', '4', '5', '6', 'B', 'D', 'N',  // 1,2,3,4,5,6,7,8,9,0
      'O' // Alternative zero
    ],
    type: 'character',
    translation: {
      'T': '1', 'A': '2', 'U': '3', 'V': '4', '4': '4',
      '5': '5', '6': '6', 'B': '8', 'D': '9', 'N': '0',
      'O': '0'
    }
  },
  COMMON_WORDS: {
    id: 'common_words',
    name: 'Common CW Words',
    sequence: [
      'DE', 'ES', 'PSE', 'TNX', 'FB', 'UR', 'RST', 'ANT', 'RIG', 'WX',
      'HR', 'HW', 'CPY', 'CQ', '73', '88', 'OM', 'YL', 'XYL', 'DX'
    ],
    type: 'phrase'
  }
};

export class MorseSequences {
  constructor() {
    this.currentPreset = SEQUENCE_PRESETS.KOCH;
    this.currentSequence = this.prepareSequence(this.currentPreset);
  }

  prepareSequence(preset) {
    if (preset.type === 'character') {
      return typeof preset.sequence === 'string' ? 
        preset.sequence.split('') : [...preset.sequence];
    }
    return [...preset.sequence];
  }

  setPreset(presetId) {
    const preset = Object.values(SEQUENCE_PRESETS).find(p => p.id === presetId);
    if (preset) {
      this.currentPreset = preset;
      this.currentSequence = this.prepareSequence(preset);
    }
  }

  getPresets() {
    return Object.values(SEQUENCE_PRESETS);
  }

  getCurrentPreset() {
    return this.currentPreset;
  }

  generateGroup(level, maxSize) {
    const available = this.currentSequence.slice(0, Math.min(level, this.currentSequence.length));
    
    if (this.currentPreset.type === 'character') {
      // For character-based sequences, generate random characters
      const actualSize = Math.floor(Math.random() * maxSize) + 1;
      let group = '';
      for (let i = 0; i < actualSize; i++) {
        group += available[Math.floor(Math.random() * available.length)];
      }
      return group;
    } else {
      // For phrase-based sequences, return a single phrase
      const phrase = available[Math.floor(Math.random() * available.length)];
      return phrase;
    }
  }

  getAvailableChars(level) {
    const available = this.currentSequence.slice(0, Math.min(level, this.currentSequence.length));
    if (this.currentPreset.type === 'character') {
      return available.join('');
    }
    return available.join(' ');
  }

  getMaxLevel() {
    return this.currentSequence.length;
  }

  shuffleSequence() {
    const array = [...this.currentSequence];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    this.currentSequence = array;
  }

  resetSequence() {
    this.currentSequence = this.prepareSequence(this.currentPreset);
  }
}
