'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  currentGroupSize,
  score,
  history,
  maxLevel,
  notification,
  onCharacterInput,
  performanceData
}) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-2 rounded border border-gray-700 text-xs">
          <p>Attempt: {data.attempt}</p>
          <p>Accuracy: {data.rollingAccuracy}%</p>
          <p>Level: {data.level}</p>
          <p>Result: {data.isCorrect ? 'Correct' : 'Wrong'}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-2">
      {/* Notification */}
      {notification && (
        <div className="fixed top-2 left-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-center">
          <div className="text-sm sm:text-base font-semibold">{notification}</div>
        </div>
      )}

      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Morse Code Trainer
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">Koch Method</p>
        </div>

        {/* Main content */}
        <div className="bg-gray-800 rounded-xl p-3 space-y-3 border border-gray-700">

          {/* Play/Stop Button */}
          <button
            onClick={onTogglePlay}
            className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors ${
              isPlaying ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {isPlaying ? 'Stop' : 'Start'}
          </button>

          {/* Controls Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Level */}
            <div className="bg-gray-700 p-2 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Level</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onLevelChange(-1)}
                  className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
                  disabled={currentLevel <= 1}
                >-</button>
                <span className="flex-1 text-center">{currentLevel}</span>
                <button
                  onClick={() => onLevelChange(1)}
                  className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
                  disabled={currentLevel >= maxLevel}
                >+</button>
              </div>
            </div>

            {/* Max Group Size */}
            <div className="bg-gray-700 p-2 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Max Group Size</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onGroupSizeChange(-1)}
                  className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
                  disabled={groupSize <= 1}
                >-</button>
                <span className="flex-1 text-center">{groupSize}</span>
                <button
                  onClick={() => onGroupSizeChange(1)}
                  className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
                  disabled={groupSize >= 10}
                >+</button>
              </div>
            </div>

            {/* Frequency */}
            <div className="bg-gray-700 p-2 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Tone (Hz)</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onFrequencyChange(-50)}
                  className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
                  disabled={frequency <= 400}
                >-</button>
                <span className="flex-1 text-center">{frequency}</span>
                <button
                  onClick={() => onFrequencyChange(50)}
                  className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
                  disabled={frequency >= 1000}
                >+</button>
              </div>
            </div>

            {/* WPM */}
            <div className="bg-gray-700 p-2 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">WPM</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onWpmChange(-1)}
                  className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
                  disabled={wpm <= 5}
                >-</button>
                <span className="flex-1 text-center">{wpm}</span>
                <button
                  onClick={() => onWpmChange(1)}
                  className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
                  disabled={wpm >= 80}
                >+</button>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-gray-700 p-2 rounded-lg text-sm">
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-400">Available:</div>
              <div className="text-xs text-gray-400">Streak: {consecutiveCorrect}/{advanceThreshold}</div>
            </div>
            <div className="mt-1 font-mono text-center">{availableChars}</div>
          </div>

          {/* Input Display */}
          <div className="bg-gray-700 p-2 rounded-lg">
            <div className="font-mono text-2xl tracking-wider text-center p-2 bg-gray-800 rounded">
              {userInput.padEnd(currentGroupSize || 1, '_')}
            </div>
          </div>

          {/* Virtual Keyboard */}
          <div className="bg-gray-700 p-2 rounded-lg">
            <div className="flex flex-wrap gap-1 justify-center">
              {availableChars.split('').map((char) => (
                <button
                  key={char}
                  onClick={() => onCharacterInput(char)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-600
                           rounded text-lg font-mono active:bg-gray-500"
                >
                  {char}
                </button>
              ))}
            </div>
          </div>

          {/* Score */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gray-700 p-2 rounded-lg text-center">
              <div className="text-xs text-gray-400">Correct</div>
              <div className="text-green-400">{score.correct}</div>
            </div>
            <div className="bg-gray-700 p-2 rounded-lg text-center">
              <div className="text-xs text-gray-400">Wrong</div>
              <div className="text-red-400">{score.wrong}</div>
            </div>
            <div className="bg-gray-700 p-2 rounded-lg text-center">
              <div className="text-xs text-gray-400">Accuracy</div>
              <div className="text-blue-400">
                {score.correct + score.wrong > 0
                  ? Math.round((score.correct / (score.correct + score.wrong)) * 100)
                  : 0}%
              </div>
            </div>
          </div>

          {/* History */}
          <div className="bg-gray-700 rounded-lg">
            <div className="text-xs text-gray-400 p-2">History</div>
            <div className="max-h-32 overflow-y-auto px-2 pb-2">
              {history.slice().reverse().map((entry, i) => (
                <div
                  key={i}
                  className={`font-mono text-sm p-1 rounded mb-1 flex justify-between items-center ${
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

          {/* Performance Graph */}
          {performanceData.length > 0 && (
            <div className="bg-gray-700 p-2 rounded-lg">
              <div className="text-xs text-gray-400 mb-2">Performance Over Time</div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="attempt"
                      stroke="#9CA3AF"
                      tickFormatter={(value) => `${value}`}
                    />
                    <YAxis
                      stroke="#9CA3AF"
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="rollingAccuracy"
                      stroke="#60A5FA"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MorseUI;

