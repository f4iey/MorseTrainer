// MorseSequences.js
export const SEQUENCE_PRESETS = {
  KOCH: {
    id: 'koch',
    name: 'Koch Method',
    sequence: 'KMRSUAPTLOWI.NJEF0Y,VG5/Q9ZH38B?427C1D6X'
  },
      QCODES: {
    id: 'qcodes',
    name: 'Common Q-Codes',
    sequence: [
      'QRL', 'QRM', 'QRN', 'QRO', 'QRP', 'QRQ', 'QRS', 'QRT', 'QRU', 'QRV',
      'QRX', 'QRZ', 'QSB', 'QSL', 'QSO', 'QSY', 'QTH', 'QST'
    ]
  },
      CUT_NUMBERS: {
    id: 'cut_numbers',
    name: 'Cut Numbers',
    sequence: [
      'T', 'A', 'U', 'V', '4', '5', '6', 'B', 'D', 'N',  // 1,2,3,4,5,6,7,8,9,0
      'O' // Alternative zero
    ]
  },
  COMMON_WORDS: {
    id: 'common_words',
    name: 'Common CW Words',
    sequence: [
      'DE', 'ES', 'PSE', 'TNX', 'FB', 'UR', 'RST', 'ANT', 'RIG', 'WX',
      'HR', 'HW', 'CPY', 'CQ', '73', '88', 'OM', 'YL', 'XYL', 'DX'
    ]
  }
};

export class MorseSequences {
  constructor() {
    this.currentPreset = SEQUENCE_PRESETS.KOCH;
    this.currentSequence = Array.isArray(this.currentPreset.sequence)
      ? [...this.currentPreset.sequence]
      : this.currentPreset.sequence.split('');
  }

  setPreset(presetId) {
    const preset = Object.values(SEQUENCE_PRESETS).find(p => p.id === presetId);
    if (preset) {
      this.currentPreset = preset;
      this.currentSequence = preset.sequence;
      if (Array.isArray(this.currentSequence)) {
        // For word-based sequences, we keep them as is
        this.currentSequence = [...this.currentSequence];
      } else {
        // For character-based sequences, we split into array
        this.currentSequence = this.currentSequence.split('');
      }
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
    if (this.currentPreset.id === 'koch') {
      // For Koch sequence, generate random characters
      const actualSize = Math.floor(Math.random() * maxSize) + 1;
      let group = '';
      for (let i = 0; i < actualSize; i++) {
        group += available[Math.floor(Math.random() * available.length)];
      }
      return group;
    } else {
      // For Q-codes, cut numbers, and words, return a single item
      return available[Math.floor(Math.random() * available.length)];
    }
  }

  getAvailableChars(level) {
    const available = this.currentSequence.slice(0, Math.min(level, this.currentSequence.length));
    if (this.currentPreset.id === 'koch') {
      return available.join('');
    }
    // For other presets, return full codes/words
    return available;
  }

  getMaxLevel() {
    return this.currentSequence.length;
  }

  shuffleSequence() {
    if (Array.isArray(this.currentSequence)) {
      for (let i = this.currentSequence.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.currentSequence[i], this.currentSequence[j]] =
        [this.currentSequence[j], this.currentSequence[i]];
      }
    } else {
      const array = this.currentSequence.split('');
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      this.currentSequence = array;
    }
  }

  resetSequence() {
    this.currentSequence = this.currentPreset.sequence;
    if (!Array.isArray(this.currentSequence)) {
      this.currentSequence = this.currentSequence.split('');
    }
  }
}