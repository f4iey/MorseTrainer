'use client';

import React, { useState, useEffect, useCallback } from 'react';

const MorseTrainer = () => {
  // Koch method starts with these letters in this order
  const KOCH_SEQUENCE = 'KMRSUAPTLOWI.NJEF0Y,VG5/Q9ZH38B?427C1D6X';
  
  // State
  const [audioContext, setAudioContext] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [wpm, setWpm] = useState(20);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGroup, setCurrentGroup] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [history, setHistory] = useState([]);
  
  // Initialize audio context
  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(ctx);
    return () => ctx.close();
  }, []);

  // Generate a dot or dash tone
  const generateTone = useCallback((duration) => {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(700, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  }, [audioContext]);

  // Convert character to morse code
  const charToMorse = (char) => {
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
    return morseCode[char.toUpperCase()] || '';
  };

  // Generate a random group of letters
  const generateGroup = useCallback(() => {
    const availableChars = KOCH_SEQUENCE.slice(0, currentLevel);
    let group = '';
    for (let i = 0; i < 5; i++) {
      group += availableChars[Math.floor(Math.random() * availableChars.length)];
    }
    return group;
  }, [currentLevel]);

  // Play morse code for a character
  const playCharacter = useCallback(async (char) => {
    const morse = charToMorse(char);
    const dotLength = 1.2 / wpm;
    
    for (const symbol of morse) {
      if (symbol === '.') {
        generateTone(dotLength);
        await new Promise(r => setTimeout(r, dotLength * 1000));
      } else {
        generateTone(dotLength * 3);
        await new Promise(r => setTimeout(r, dotLength * 3000));
      }
      await new Promise(r => setTimeout(r, dotLength * 1000));
    }
    await new Promise(r => setTimeout(r, dotLength * 3000));
  }, [generateTone, wpm]);

  // Play the current group
  const playGroup = useCallback(async () => {
    if (!isPlaying) return;
    for (const char of currentGroup) {
      await playCharacter(char);
    }
    await new Promise(r => setTimeout(r, 1000));
    if (isPlaying) playGroup();
  }, [currentGroup, isPlaying, playCharacter]);

  // Handle start/stop
  const togglePlay = () => {
    if (!isPlaying) {
      const newGroup = generateGroup();
      setCurrentGroup(newGroup);
      setUserInput('');
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setCurrentGroup('');
      setUserInput('');
    }
  };

  // Handle user input
  const handleKeyPress = useCallback((e) => {
    if (!isPlaying) return;
    
    const key = e.key.toUpperCase();
    if (KOCH_SEQUENCE.includes(key)) {
      const newInput = userInput + key;
      setUserInput(newInput);
      
      if (newInput.length === currentGroup.length) {
        if (newInput === currentGroup) {
          setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
          setHistory(prev => [...prev, { group: currentGroup, correct: true }]);
          const newGroup = generateGroup();
          setCurrentGroup(newGroup);
          setUserInput('');
        } else {
          setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
          setHistory(prev => [...prev, { group: currentGroup, correct: false }]);
          setUserInput('');
        }
      }
    }
  }, [isPlaying, userInput, currentGroup, generateGroup, KOCH_SEQUENCE]);

  // Set up keyboard listener
  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleKeyPress]);

  // Start playing when isPlaying becomes true
  useEffect(() => {
    if (isPlaying) {
      playGroup();
    }
  }, [isPlaying, playGroup]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-black rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Morse Code Trainer</h1>
        <p className="text-gray-600 dark:text-gray-400">Koch Method</p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <button 
            onClick={togglePlay}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {isPlaying ? 'Stop' : 'Start'}
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Level:</span>
              <button
                onClick={() => setCurrentLevel(prev => Math.max(1, prev - 1))}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded"
                disabled={currentLevel <= 1}
              >
                -
              </button>
              <span>{currentLevel}</span>
              <button
                onClick={() => setCurrentLevel(prev => Math.min(prev + 1, KOCH_SEQUENCE.length))}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded"
                disabled={currentLevel >= KOCH_SEQUENCE.length}
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span>WPM:</span>
              <button
                onClick={() => setWpm(prev => Math.max(5, prev - 5))}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded"
                disabled={wpm <= 5}
              >
                -
              </button>
              <span>{wpm}</span>
              <button
                onClick={() => setWpm(prev => Math.min(50, prev + 5))}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded"
                disabled={wpm >= 50}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="text-gray-600 dark:text-gray-400">
          Available characters: {KOCH_SEQUENCE.slice(0, currentLevel)}
        </div>

        <div className="text-center space-y-4">
          <div className="text-2xl font-mono tracking-wider">
            {userInput.padEnd(5, '_')}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Type the letters you hear
          </div>
        </div>

        <div className="flex justify-between text-lg">
          <div>Correct: {score.correct}</div>
          <div>Wrong: {score.wrong}</div>
          {score.correct + score.wrong > 0 && (
            <div>
              Accuracy: {Math.round((score.correct / (score.correct + score.wrong)) * 100)}%
            </div>
          )}
        </div>

        <div className="border rounded p-4 h-48 overflow-y-auto">
          <div className="text-sm font-mono space-y-1">
            {history.slice().reverse().map((entry, i) => (
              <div 
                key={i}
                className={entry.correct ? 'text-green-600' : 'text-red-600'}
              >
                {entry.group} {entry.correct ? '✓' : '✗'}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorseTrainer;
