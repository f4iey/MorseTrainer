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
    
    // ADSR envelope parameters (in seconds)
    this.attackTime = 0.005;
    this.decayTime = 0.005;
    this.sustainLevel = 0.8;
    this.releaseTime = 0.005;
    
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
      const { gainNode } = this.activeOscillator;
      const now = this.audioContext.currentTime;
      
      // Apply release envelope
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.linearRampToValueAtTime(0, now + this.releaseTime);
      
      setTimeout(() => {
        try {
          this.activeOscillator.oscillator.stop();
          this.activeOscillator.oscillator.disconnect();
          this.activeOscillator.gainNode.disconnect();
        } catch (e) {
          // Ignore errors from already stopped oscillators
        }
        this.activeOscillator = null;
      }, this.releaseTime * 1000);
    }
  }

  async playTone(duration, signal) {
    if (!this.audioContext || !this.isPlaying) return;
    if (signal?.aborted) return;
    
    // Stop any existing tone with release envelope
    if (this.activeOscillator) {
      const { gainNode } = this.activeOscillator;
      const now = this.audioContext.currentTime;
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.linearRampToValueAtTime(0, now + this.releaseTime);
      
      await new Promise(resolve => setTimeout(resolve, this.releaseTime * 1000));
      
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
    
    // Initialize gain at 0
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    
    // Attack
    gainNode.gain.linearRampToValueAtTime(1, now + this.attackTime);
    
    // Decay to sustain level
    gainNode.gain.linearRampToValueAtTime(
      this.sustainLevel,
      now + this.attackTime + this.decayTime
    );
    
    // Schedule release
    const releaseStart = now + duration - this.releaseTime;
    gainNode.gain.setValueAtTime(this.sustainLevel, releaseStart);
    gainNode.gain.linearRampToValueAtTime(0, releaseStart + this.releaseTime);
    
    this.activeOscillator = { oscillator, gainNode };
    
    oscillator.start();
    oscillator.stop(now + duration);
    
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
