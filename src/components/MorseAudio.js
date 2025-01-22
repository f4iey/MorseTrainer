// MorseAudio.js
class MorseAudioManager {
  constructor() {
    if (MorseAudioManager.instance) {
      return MorseAudioManager.instance;
    }
    
    this.audioContext = null;
    this.activeOscillator = null;
    this.frequency = 700;
    this.isPlaying = false;
    this.activeTimeout = null;
    this.abortController = null;
    
    MorseAudioManager.instance = this;
  }

  initialize() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  stopAll() {
    // Signal abort to all pending operations
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    
    this.isPlaying = false;
    
    if (this.activeTimeout) {
      clearTimeout(this.activeTimeout);
      this.activeTimeout = null;
    }
    
    if (this.activeOscillator) {
      try {
        this.activeOscillator.oscillator.stop();
        this.activeOscillator.oscillator.disconnect();
        this.activeOscillator.gainNode.disconnect();
      } catch (e) {
        // Ignore errors from already stopped oscillators
      }
      this.activeOscillator = null;
    }
  }

  async playTone(duration, signal) {
    if (!this.audioContext || !this.isPlaying) return;
    
    // Check if we've been aborted
    if (signal?.aborted) return;
    
    // Stop any existing tone first
    if (this.activeOscillator) {
      try {
        this.activeOscillator.oscillator.stop();
        this.activeOscillator.oscillator.disconnect();
        this.activeOscillator.gainNode.disconnect();
      } catch (e) {
        // Ignore errors from already stopped oscillators
      }
      this.activeOscillator = null;
    }
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(this.frequency, this.audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);
    
    this.activeOscillator = { oscillator, gainNode };
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
    
    return new Promise((resolve, reject) => {
      if (signal?.aborted) {
        reject(new Error('Aborted'));
        return;
      }
      
      signal?.addEventListener('abort', () => {
        reject(new Error('Aborted'));
      });
      
      oscillator.onended = () => {
        this.activeOscillator = null;
        resolve();
      };
    });
  }

  async playSequence(chars, wpm) {
    // Create new abort controller for this sequence
    this.abortController = new AbortController();
    const signal = this.abortController.signal;
    
    try {
      if (!this.isPlaying) return;
      
      const dotLength = 1.2 / wpm;
      const morseCode = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
        '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
        '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
        '/': '-..-.'
      };

      for (const char of chars) {
        if (!this.isPlaying || signal.aborted) return;
        
        const morse = morseCode[char.toUpperCase()] || '';
        for (const symbol of morse) {
          if (!this.isPlaying || signal.aborted) return;
          
          try {
            if (symbol === '.') {
              await this.playTone(dotLength, signal);
            } else {
              await this.playTone(dotLength * 3, signal);
            }
            
            // Gap between symbols
            await new Promise((resolve, reject) => {
              if (signal.aborted) {
                reject(new Error('Aborted'));
                return;
              }
              
              this.activeTimeout = setTimeout(() => {
                this.activeTimeout = null;
                resolve();
              }, dotLength * 1000);
              
              signal.addEventListener('abort', () => {
                if (this.activeTimeout) {
                  clearTimeout(this.activeTimeout);
                  this.activeTimeout = null;
                }
                reject(new Error('Aborted'));
              });
            });
          } catch (e) {
            if (e.message === 'Aborted') return;
            throw e;
          }
        }
        
        // Gap between characters
        await new Promise((resolve, reject) => {
          if (signal.aborted) {
            reject(new Error('Aborted'));
            return;
          }
          
          this.activeTimeout = setTimeout(() => {
            this.activeTimeout = null;
            resolve();
          }, dotLength * 3000);
          
          signal.addEventListener('abort', () => {
            if (this.activeTimeout) {
              clearTimeout(this.activeTimeout);
              this.activeTimeout = null;
            }
            reject(new Error('Aborted'));
          });
        });
      }
      
      // Schedule next playback if still playing
      if (this.isPlaying && !signal.aborted) {
        this.activeTimeout = setTimeout(() => this.playSequence(chars, wpm), 2000);
      }
    } catch (e) {
      if (e.message !== 'Aborted') throw e;
    }
  }

  start() {
    this.isPlaying = true;
  }

  stop() {
    this.stopAll();
  }

  setFrequency(freq) {
    this.frequency = freq;
  }

  cleanup() {
    this.stopAll();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    MorseAudioManager.instance = null;
  }
}

// Export a singleton instance
export const morseAudio = new MorseAudioManager();
