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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-2 py-4 sm:p-8">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 bg-blue-500 text-white px-4 py-3 sm:px-8 sm:py-4 rounded-lg shadow-2xl z-50 animate-fade-in text-center">
          <div className="text-base sm:text-lg font-semibold">{notification}</div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Morse Code Trainer
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">Koch Method</p>
        </div>

        {/* Main content container */}
        <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-2xl space-y-6 sm:space-y-8 border border-gray-700">
          {/* Controls section */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Play/Stop Button */}
            <button 
              onClick={onTogglePlay}
              className={`w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg ${
                isPlaying 
                  ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30' 
                  : 'bg-green-500 hover:bg-green-600 shadow-green-500/30'
              }`}
            >
              {isPlaying ? 'Stop' : 'Start'}
            </button>

            {/* Settings Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 flex-1">
              {/* Level Control */}
              <div className="bg-gray-700 p-3 rounded-lg">
                <div className="text-gray-400 mb-1 text-sm">Level</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onLevelChange(-1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-600 hover:bg-gray-500 disabled:opacity-50 transition-colors"
                    disabled={currentLevel <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg sm:text-xl font-semibold w-8 sm:w-12 text-center">{currentLevel}</span>
                  <button
                    onClick={() => onLevelChange(1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-600 hover:bg-gray-500 disabled:opacity-50 transition-colors"
                    disabled={currentLevel >= maxLevel}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Group Size Control */}
              <div className="bg-gray-700 p-3 rounded-lg">
                <div className="text-gray-400 mb-1 text-sm">Size</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onGroupSizeChange(-1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-600 hover:bg-gray-500 disabled:opacity-50 transition-colors"
                    disabled={groupSize <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg sm:text-xl font-semibold w-8 sm:w-12 text-center">{groupSize}</span>
                  <button
                    onClick={() => onGroupSizeChange(1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-600 hover:bg-gray-500 disabled:opacity-50 transition-colors"
                    disabled={groupSize >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Tone Control */}
              <div className="bg-gray-700 p-3 rounded-lg">
                <div className="text-gray-400 mb-1 text-sm">Hz</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onFrequencyChange(-50)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-600 hover:bg-gray-500 disabled:opacity-50 transition-colors"
                    disabled={frequency <= 400}
                  >
                    -
                  </button>
                  <span className="text-lg sm:text-xl font-semibold w-12 sm:w-16 text-center">{frequency}</span>
                  <button
                    onClick={() => onFrequencyChange(50)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-600 hover:bg-gray-500 disabled:opacity-50 transition-colors"
                    disabled={frequency >= 1000}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Advance Threshold Control */}
              <div className="bg-gray-700 p-3 rounded-lg">
                <div className="text-gray-400 mb-1 text-sm">Advance</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAdvanceThresholdChange(-1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-600 hover:bg-gray-500 disabled:opacity-50 transition-colors"
                    disabled={advanceThreshold <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg sm:text-xl font-semibold w-8 sm:w-12 text-center">{advanceThreshold}</span>
                  <button
                    onClick={() => onAdvanceThresholdChange(1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-600 hover:bg-gray-500 disabled:opacity-50 transition-colors"
                    disabled={advanceThreshold >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* WPM Control */}
              <div className="bg-gray-700 p-3 rounded-lg">
                <div className="text-gray-400 mb-1 text-sm">WPM</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onWpmChange(-5)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-600 hover:bg-gray-500 disabled:opacity-50 transition-colors"
                    disabled={wpm <= 5}
                  >
                    -
                  </button>
                  <span className="text-lg sm:text-xl font-semibold w-8 sm:w-12 text-center">{wpm}</span>
                  <button
                    onClick={() => onWpmChange(5)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-600 hover:bg-gray-500 disabled:opacity-50 transition-colors"
                    disabled={wpm >= 50}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 bg-gray-700 p-3 rounded-lg text-sm sm:text-base">
            <div>
              <span className="text-gray-400">Available: </span>
              <span className="font-mono break-all">{availableChars}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Streak:</span>
              <div className="font-mono bg-gray-600 px-3 py-1 rounded-lg">
                {consecutiveCorrect}/{advanceThreshold}
              </div>
            </div>
          </div>

          {/* Input Display */}
          <div className="text-center space-y-3 bg-gray-700 p-4 sm:p-8 rounded-lg">
            <div className="text-2xl sm:text-4xl font-mono tracking-wider bg-gray-800 py-4 px-2 rounded-lg overflow-x-auto">
              {userInput.padEnd(groupSizePadding, '_')}
            </div>
            <div className="text-gray-400 text-sm sm:text-base">
              Type the letters you hear
            </div>
          </div>

          {/* Score Display */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-700 p-3 rounded-lg text-center">
              <div className="text-gray-400 text-xs sm:text-sm mb-1">Correct</div>
              <div className="text-xl sm:text-2xl font-semibold text-green-400">{score.correct}</div>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg text-center">
              <div className="text-gray-400 text-xs sm:text-sm mb-1">Wrong</div>
              <div className="text-xl sm:text-2xl font-semibold text-red-400">{score.wrong}</div>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg text-center">
              <div className="text-gray-400 text-xs sm:text-sm mb-1">Accuracy</div>
              <div className="text-xl sm:text-2xl font-semibold text-blue-400">
                {score.correct + score.wrong > 0 
                  ? Math.round((score.correct / (score.correct + score.wrong)) * 100) 
                  : 0}%
              </div>
            </div>
          </div>

          {/* History */}
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="text-gray-400 mb-2 text-sm">History</div>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {history.slice().reverse().map((entry, i) => (
                <div 
                  key={i}
                  className={`font-mono p-2 rounded text-sm sm:text-base flex justify-between items-center ${
                    entry.correct 
                      ? 'bg-green-500/10 text-green-400' 
                      : 'bg-red-500/10 text-red-400'
                  }`}
                >
                  <span>{entry.group}</span>
                  <span>{entry.correct ? '✓' : '✗'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorseUI;
