'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import MorseUI from './MorseUI';
import { morseAudio } from './MorseAudio';
import { MorseLogic } from './MorseLogic';

const MorseTrainer = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [wpm, setWpm] = useState(20);
  const [frequency, setFrequency] = useState(600);
  const [groupSize, setGroupSize] = useState(3);
  const [currentGroupSize, setCurrentGroupSize] = useState(0); // Track current actual group size
  const [advanceThreshold, setAdvanceThreshold] = useState(3);
  const [userInput, setUserInput] = useState('');
  const [currentGroup, setCurrentGroup] = useState('');
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [history, setHistory] = useState([]);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [notification, setNotification] = useState('');

  const logicRef = useRef(new MorseLogic());
  const notificationTimeoutRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    morseAudio.initialize();
    return () => {
      morseAudio.cleanup();
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  // Handle frequency changes
  useEffect(() => {
    morseAudio.setFrequency(frequency);
  }, [frequency]);

  const showNotification = useCallback((message, duration = 2000) => {
    setNotification(message);
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification('');
      notificationTimeoutRef.current = null;
    }, duration);
  }, []);

  const startNewGroup = useCallback((delay = 0) => {
    const start = () => {
      const newGroup = logicRef.current.generateGroup(currentLevel, groupSize);
      setCurrentGroup(newGroup);
      setCurrentGroupSize(newGroup.length); // Set the actual size of the new group
      setUserInput('');
      setIsPlaying(true);
      morseAudio.start();
      morseAudio.playSequence(newGroup, wpm);
    };

    if (delay > 0) {
      setTimeout(start, delay);
    } else {
      start();
    }
  }, [currentLevel, groupSize, wpm]);

  const handleCharacterInput = useCallback((char) => {
    if (!isPlaying || notification) return;
    
    const newInput = userInput + char;
    setUserInput(newInput);
    
    if (newInput.length === currentGroup.length) {
      // Stop current playback immediately
      morseAudio.stop();
      setIsPlaying(false);
      
      if (newInput === currentGroup) {
        // Correct answer
        setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
        setHistory(prev => [...prev, { group: currentGroup, correct: true }]);
        
        const newConsecutiveCorrect = consecutiveCorrect + 1;
        setConsecutiveCorrect(newConsecutiveCorrect);
        
        // Check for level advancement
        if (newConsecutiveCorrect >= advanceThreshold && currentLevel < logicRef.current.getMaxLevel()) {
          const newLevel = currentLevel + 1;
          setCurrentLevel(newLevel);
          setConsecutiveCorrect(0);
          showNotification(`Level up! Now at level ${newLevel}`, 3000);
          startNewGroup(3000); // Delay start of new group
        } else {
          startNewGroup(500); // Small delay between groups
        }
      } else {
        // Wrong answer
        setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
        setHistory(prev => [...prev, { group: currentGroup, correct: false }]);
        setConsecutiveCorrect(0);
        
        // Decrease level if not at minimum
        if (currentLevel > 1) {
          const newLevel = currentLevel - 1;
          setCurrentLevel(newLevel);
          showNotification(`Level decreased to ${newLevel}`, 3000);
          startNewGroup(3000); // Delay start of new group
        } else {
          startNewGroup(500); // Small delay between groups
        }
      }
    }
  }, [
    isPlaying, userInput, currentGroup, consecutiveCorrect, advanceThreshold,
    currentLevel, startNewGroup, showNotification, notification
  ]);

  // Handle keyboard input
  const handleKeyPress = useCallback((e) => {
    if (!isPlaying || notification) return;
    
    const key = e.key.toUpperCase();
    if (logicRef.current.KOCH_SEQUENCE.includes(key)) {
      handleCharacterInput(key);
    }
  }, [isPlaying, handleCharacterInput, notification]);

  // Set up keyboard listener
  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleKeyPress]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      morseAudio.stop();
      setIsPlaying(false);
      setCurrentGroup('');
      setUserInput('');
      setHistory([]);
      setScore({ correct: 0, wrong: 0 });
      setConsecutiveCorrect(0);
      setCurrentGroupSize(0);
    } else {
      startNewGroup();
    }
  };

  // Control handlers
  const handleLevelChange = (delta) => {
    const newLevel = Math.max(1, Math.min(logicRef.current.getMaxLevel(), currentLevel + delta));
    if (newLevel !== currentLevel) {
      setCurrentLevel(newLevel);
      if (isPlaying) {
        morseAudio.stop();
        setIsPlaying(false);
        showNotification(`Level changed to ${newLevel}`, 3000);
        startNewGroup(3000);
      }
    }
  };

  const handleGroupSizeChange = (delta) => {
    const newSize = Math.max(1, Math.min(10, groupSize + delta));
    setGroupSize(newSize);
    if (isPlaying) {
      morseAudio.stop();
      startNewGroup(500);
    }
  };

  const handleFrequencyChange = (delta) => {
    const newFreq = Math.max(400, Math.min(1000, frequency + delta));
    setFrequency(newFreq);
  };

  const handleAdvanceThresholdChange = (delta) => {
    const newThreshold = Math.max(1, Math.min(10, advanceThreshold + delta));
    setAdvanceThreshold(newThreshold);
  };

  const handleWpmChange = (delta) => {
    const newWpm = Math.max(5, Math.min(50, wpm + delta));
    setWpm(newWpm);
    if (isPlaying) {
      morseAudio.stop();
      startNewGroup(500);
    }
  };

  return (
    <MorseUI
      isPlaying={isPlaying}
      onTogglePlay={handleTogglePlay}
      currentLevel={currentLevel}
      onLevelChange={handleLevelChange}
      groupSize={groupSize}
      onGroupSizeChange={handleGroupSizeChange}
      frequency={frequency}
      onFrequencyChange={handleFrequencyChange}
      advanceThreshold={advanceThreshold}
      onAdvanceThresholdChange={handleAdvanceThresholdChange}
      wpm={wpm}
      onWpmChange={handleWpmChange}
      availableChars={logicRef.current.getAvailableChars(currentLevel)}
      consecutiveCorrect={consecutiveCorrect}
      userInput={userInput}
      currentGroupSize={currentGroupSize} // Pass actual current group size instead of max group size
      score={score}
      history={history}
      maxLevel={logicRef.current.getMaxLevel()}
      notification={notification}
      onCharacterInput={handleCharacterInput}
    />
  );
};

export default MorseTrainer;
