// MorseUI.jsx
const MorseUI = ({
  isPlaying,
  onTogglePlay,
  currentLevel,
  onLevelChange,
  groupSize,
  onGroupSizeChange,
  frequency,
  onFrequencyChange,
  advanceThreshold,
  onAdvanceThresholdChange,
  wpm,
  onWpmChange,
  availableChars,
  consecutiveCorrect,
  userInput,
  groupSizePadding,
  score,
  history,
  maxLevel,
  notification
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-black rounded-lg shadow-lg">
      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}
      
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Morse Code Trainer</h1>
        <p className="text-gray-600 dark:text-gray-400">Koch Method</p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <button 
            onClick={onTogglePlay}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {isPlaying ? 'Stop' : 'Start'}
          </button>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span>Level:</span>
              <button
                onClick={() => onLevelChange(-1)}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded"
                disabled={currentLevel <= 1}
              >
                -
              </button>
              <span>{currentLevel}</span>
              <button
                onClick={() => onLevelChange(1)}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded"
                disabled={currentLevel >= maxLevel}
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span>Group Size:</span>
              <button
                onClick={() => onGroupSizeChange(-1)}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded"
                disabled={groupSize <= 1}
              >
                -
              </button>
              <span>{groupSize}</span>
              <button
                onClick={() => onGroupSizeChange(1)}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded"
                disabled={groupSize >= 10}
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span>Tone (Hz):</span>
              <button
                onClick={() => onFrequencyChange(-50)}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded"
                disabled={frequency <= 400}
              >
                -
              </button>
              <span>{frequency}</span>
              <button
                onClick={() => onFrequencyChange(50)}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded"
                disabled={frequency >= 1000}
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span>Advance after:</span>
              <button
                onClick={() => onAdvanceThresholdChange(-1)}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded"
                disabled={advanceThreshold <= 1}
              >
                -
              </button>
              <span>{advanceThreshold}</span>
              <button
                onClick={() => onAdvanceThresholdChange(1)}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded"
                disabled={advanceThreshold >= 10}
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span>WPM:</span>
              <button
                onClick={() => onWpmChange(-5)}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded"
                disabled={wpm <= 5}
              >
                -
              </button>
              <span>{wpm}</span>
              <button
                onClick={() => onWpmChange(5)}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded"
                disabled={wpm >= 50}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="text-gray-600 dark:text-gray-400 flex justify-between items-center">
          <div>Available characters: {availableChars}</div>
          <div>Streak: {consecutiveCorrect}/{advanceThreshold}</div>
        </div>

        <div className="text-center space-y-4">
          <div className="text-2xl font-mono tracking-wider">
            {userInput.padEnd(groupSizePadding, '_')}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Type the letters you hear
          </div>
        </div>

        <div className="flex justify-between text-lg">
          <div>Correct: {score.correct}</div>
          <div>Wrong: {score.wrong}</div>
          <div>
            Accuracy: {score.correct + score.wrong > 0 
              ? Math.round((score.correct / (score.correct + score.wrong)) * 100) 
              : 0}%
          </div>
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

export default MorseUI;
