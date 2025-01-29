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
    this.letterWeights = new Map();
    this.newLetterBoostDuration = 10;
    this.groupsGenerated = 0;
    this.lastAddedLevel = 1;
  }

  prepareSequence(preset) {
    if (preset.type === 'character') {
      return typeof preset.sequence === 'string' ?
        preset.sequence.split('') : [...preset.sequence];
    }
    return [...preset.sequence];
  }

  resetWeights() {
    this.letterWeights.clear();
    this.groupsGenerated = 0;
    this.lastAddedLevel = 1;
  }

  updateWeightsForLevel(newLevel) {
    if (this.currentPreset.type === 'character' && newLevel > this.lastAddedLevel) {
      for (let i = this.lastAddedLevel; i < newLevel; i++) {
        const newLetter = this.currentSequence[i];
        this.letterWeights.set(newLetter, 2.0);
      }
      this.lastAddedLevel = newLevel;
    }
  }

  decayWeights() {
    for (const [letter, weight] of this.letterWeights.entries()) {
      if (weight > 1.0) {
        const newWeight = Math.max(1.0, weight - 0.1);
        this.letterWeights.set(letter, newWeight);
      }
    }
  }

  weightedSample(chars, size) {
    // Initialize weights for available characters only
    const weights = new Array(chars.length).fill(1.0);

    // Apply stored weights for character-based sequences
    if (this.currentPreset.type === 'character') {
      for (let i = 0; i < chars.length; i++) {
        const storedWeight = this.letterWeights.get(chars[i]);
        if (storedWeight) {
          weights[i] = storedWeight;
        }
      }
    }

    // Calculate cumulative weights
    const cumWeights = [];
    let sum = 0;
    for (const w of weights) {
      sum += w;
      cumWeights.push(sum);
    }

    // Weighted random sampling
    const selected = new Set();
    const result = [];

    // For character-based sequences, ensure at least one high-weight character if present
    if (this.currentPreset.type === 'character') {
      const highWeightIndices = weights
        .map((w, i) => w > 1.0 ? i : -1)
        .filter(i => i !== -1);

      if (highWeightIndices.length > 0) {
        const idx = highWeightIndices[Math.floor(Math.random() * highWeightIndices.length)];
        result.push(chars[idx]);
        selected.add(idx);
      }
    }

    // Fill remaining positions
    while (result.length < size) {
      const r = Math.random() * sum;
      let idx = cumWeights.findIndex(w => w > r);

      // Ensure we don't exceed the available characters
      if (idx >= chars.length) {
        idx = chars.length - 1;
      }

      // Avoid duplicates if possible
      if (selected.has(idx)) {
        const available = chars.filter((_, i) => !selected.has(i));
        if (available.length > 0) {
          const newChar = available[Math.floor(Math.random() * available.length)];
          idx = chars.indexOf(newChar);
        }
      }

      result.push(chars[idx]);
      selected.add(idx);
    }

    return result;
  }

  generateGroup(level, maxSize) {
    const available = this.currentSequence.slice(0, Math.min(level, this.currentSequence.length));

    if (this.currentPreset.type === 'character') {
      this.updateWeightsForLevel(level);
      const actualSize = Math.floor(Math.random() * maxSize) + 1;
      const selectedChars = this.weightedSample(available, actualSize);

      // Update state
      this.groupsGenerated++;
      if (this.groupsGenerated % 5 === 0) {
        this.decayWeights();
      }

      return selectedChars.join('');
    } else {
      // For phrase-based sequences, return a single phrase
      return available[Math.floor(Math.random() * available.length)];
    }
  }

  setPreset(presetId) {
    const preset = Object.values(SEQUENCE_PRESETS).find(p => p.id === presetId);
    if (preset) {
      this.currentPreset = preset;
      this.currentSequence = this.prepareSequence(preset);
      this.resetWeights();
    }
  }

  getPresets() {
    return Object.values(SEQUENCE_PRESETS);
  }

  getCurrentPreset() {
    return this.currentPreset;
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
    if (this.currentPreset.type === 'character') {
      const array = [...this.currentSequence];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      this.currentSequence = array;
      this.resetWeights();
    }
  }

  resetSequence() {
    this.currentSequence = this.prepareSequence(this.currentPreset);
    this.resetWeights();
  }
}