'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import MorseUI from './MorseUI';
import { morseAudio } from './MorseAudio';
import { MorseLogic } from './MorseLogic';
import { MorseSettings } from './MorseSettings';

const MorseTrainer = () => {
  const loadSettings = () => {
    const settings = MorseSettings.load();
    return {
      currentLevel: settings.currentLevel,
      wpm: settings.wpm,
      frequency: settings.frequency,
      groupSize: settings.groupSize,
      advanceThreshold: settings.advanceThreshold,
      headCopyMode: settings.headCopyMode,
      hideChars: settings.hideChars
    };
  };

  const savedSettings = loadSettings();
  const [currentLevel, setCurrentLevel] = useState(savedSettings.currentLevel);
  const [wpm, setWpm] = useState(savedSettings.wpm);
  const [frequency, setFrequency] = useState(savedSettings.frequency);
  const [groupSize, setGroupSize] = useState(savedSettings.groupSize);
  const [advanceThreshold, setAdvanceThreshold] = useState(savedSettings.advanceThreshold);
  const [headCopyMode, setHeadCopyMode] = useState(savedSettings.headCopyMode);
  const [hideChars, setHideChars] = useState(savedSettings.hideChars);
  const [showAnswer, setShowAnswer] = useState(false);

  const [currentGroupSize, setCurrentGroupSize] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [currentGroup, setCurrentGroup] = useState('');
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [history, setHistory] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [notification, setNotification] = useState('');
  const [qsbAmount, setQsbAmount] = useState(savedSettings.qsbAmount || 0);

  const logicRef = useRef(new MorseLogic());
  const notificationTimeoutRef = useRef(null);

  useEffect(() => {
    morseAudio.initialize();
    return () => {
      morseAudio.cleanup();
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    MorseSettings.save({
      currentLevel,
      wpm,
      frequency,
      groupSize,
      advanceThreshold,
      headCopyMode,
      hideChars,
      qsbAmount
    });
  }, [currentLevel, wpm, frequency, groupSize, advanceThreshold, headCopyMode, hideChars]);

  useEffect(() => {
    morseAudio.setFrequency(frequency);
  }, [frequency]);

  const showNotification = useCallback((message, color = 'blue', duration = 2000) => {
    setNotification({ message, color });
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
      notificationTimeoutRef.current = null;
    }, duration);
  }, []);

  const startNewGroup = useCallback((level, delay = 0) => {
    const start = () => {
      const newGroup = logicRef.current.generateGroup(level, groupSize);
      setCurrentGroup(newGroup);
      setCurrentGroupSize(newGroup.length);
      setUserInput('');
      setShowAnswer(false);
      setIsPlaying(true);
      morseAudio.start();
      morseAudio.playSequence(newGroup, wpm);
    };

    if (delay > 0) {
      setTimeout(start, delay);
    } else {
      start();
    }
  }, [groupSize, wpm]);

  const updatePerformanceData = useCallback((isCorrect, level) => {
    setPerformanceData(prev => {
      const newData = [...prev];
      const timestamp = new Date().getTime();

      const lastTenAttempts = newData.slice(-9).concat([{ isCorrect }]);
      const rollingAccuracy = lastTenAttempts.reduce((acc, curr) =>
        acc + (curr.isCorrect ? 1 : 0), 0) / lastTenAttempts.length * 100;

      newData.push({
        timestamp,
        attempt: newData.length + 1,
        isCorrect,
        rollingAccuracy: Math.round(rollingAccuracy),
        level,
      });

      return newData.slice(-100);
    });
  }, []);

  const handleCharacterInput = useCallback((char) => {
    if (!isPlaying || notification) return;

    const newInput = userInput + char;
    setUserInput(newInput);

    if (newInput.length === currentGroup.length) {
      morseAudio.stop();
      setIsPlaying(false);

      const isCorrect = newInput === currentGroup;
      updatePerformanceData(isCorrect, currentLevel);

      if (isCorrect) {
        setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
        setHistory(prev => [...prev, { group: currentGroup, correct: true }]);

        const newConsecutiveCorrect = consecutiveCorrect + 1;
        setConsecutiveCorrect(newConsecutiveCorrect);

        if (newConsecutiveCorrect >= advanceThreshold && currentLevel < logicRef.current.getMaxLevel()) {
          const newLevel = currentLevel + 1;
          setCurrentLevel(newLevel);
          setConsecutiveCorrect(0);
          showNotification(`Level up! Now at level ${newLevel}`, 'blue', 3000);
          startNewGroup(newLevel, 3000);
        } else {
          startNewGroup(currentLevel, 500);
        }
      } else {
        setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
        setHistory(prev => [...prev, { group: currentGroup, correct: false }]);
        setConsecutiveCorrect(0);

        if (currentLevel > 1) {
          const newLevel = currentLevel - 1;
          setCurrentLevel(newLevel);
          showNotification(`Level decreased to ${newLevel}`, 'red', 3000);
          startNewGroup(newLevel, 3000);
        } else {
          startNewGroup(currentLevel, 500);
        }
      }
    }
  }, [
    isPlaying, userInput, currentGroup, consecutiveCorrect, advanceThreshold,
    currentLevel, startNewGroup, showNotification, notification, updatePerformanceData,
    headCopyMode, showAnswer
  ]);

  const handleKeyPress = useCallback((e) => {
    if (!isPlaying || notification) return;

    const key = e.key.toUpperCase();
    if (logicRef.current.KOCH_SEQUENCE.includes(key)) {
      handleCharacterInput(key);
    }
  }, [isPlaying, handleCharacterInput, notification, headCopyMode, showAnswer]);

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
      setPerformanceData([]);
      setShowAnswer(false);
    } else {
      startNewGroup(currentLevel);
    }
  };

  const handleLevelChange = (delta) => {
    const newLevel = Math.max(1, Math.min(logicRef.current.getMaxLevel(), currentLevel + delta));
    if (newLevel !== currentLevel) {
      setCurrentLevel(newLevel);
      if (isPlaying) {
        morseAudio.stop();
        setIsPlaying(false);
        showNotification(`Level changed to ${newLevel}`, 'yellow', 3000);
        startNewGroup(newLevel, 3000);
      }
    }
  };

  const handleGroupSizeChange = (delta) => {
    const newSize = Math.max(1, Math.min(10, groupSize + delta));
    setGroupSize(newSize);
    if (isPlaying) {
      morseAudio.stop();
      startNewGroup(currentLevel, 500);
    }
  };

  const handleFrequencyChange = (delta) => {
    const newFreq = Math.max(400, Math.min(1000, frequency + delta));
    setFrequency(newFreq);
  };

  const handleWpmChange = (delta) => {
    const newWpm = Math.max(5, Math.min(50, wpm + delta));
    setWpm(newWpm);
    if (isPlaying) {
      morseAudio.stop();
      startNewGroup(currentLevel, 500);
    }
  };

  const handleQsbChange = (delta) => {
    const newAmount = Math.max(0, Math.min(100, qsbAmount + delta));
    setQsbAmount(newAmount);
    morseAudio.setQsbAmount(newAmount);
  };

  const handleHeadCopyMode = () => {
    setHeadCopyMode(!headCopyMode);
    if (isPlaying) {
      morseAudio.stop();
      startNewGroup(currentLevel, 500);
    }
  };

  const handleHideChars = () => {
    setHideChars(!hideChars);
  };

  const handleShowAnswer = () => {
    if (headCopyMode && isPlaying) {
      setShowAnswer(true);
    }
  };

  const handleShuffleKoch = () => {
    logicRef.current.shuffleSequence();
    showNotification('Koch sequence shuffled', 'purple', 2000);
    if (isPlaying) {
      morseAudio.stop();
      startNewGroup(currentLevel, 500);
    }
  };

  const handleResetKoch = () => {
    logicRef.current.resetSequence();
    showNotification('Koch sequence reset', 'gray', 2000);
    if (isPlaying) {
      morseAudio.stop();
      startNewGroup(currentLevel, 500);
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
      wpm={wpm}
      onWpmChange={handleWpmChange}
      availableChars={logicRef.current.getAvailableChars(currentLevel)}
      consecutiveCorrect={consecutiveCorrect}
      userInput={userInput}
      currentGroupSize={currentGroupSize}
      score={score}
      history={history}
      maxLevel={logicRef.current.getMaxLevel()}
      notification={notification}
      onCharacterInput={handleCharacterInput}
      performanceData={performanceData}
      headCopyMode={headCopyMode}
      onHeadCopyMode={handleHeadCopyMode}
      hideChars={hideChars}
      onHideChars={handleHideChars}
      showAnswer={showAnswer}
      onShowAnswer={handleShowAnswer}
      currentGroup={headCopyMode && !showAnswer ? '' : currentGroup}
      onShuffleKoch={handleShuffleKoch}
      onResetKoch={handleResetKoch}
      qsbAmount={qsbAmount}
      onQsbChange={handleQsbChange}
    />
  );
};

export default MorseTrainer;
