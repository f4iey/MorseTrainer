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
  performanceData,
  headCopyMode,
  onHeadCopyMode,
  hideChars,
  onHideChars,
  showAnswer,
  onShowAnswer,
  currentGroup,
  onShuffleKoch,
  onResetKoch,
  qsbAmount,
  onQsbChange,
  qrmAmount,
  onQrmChange
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
      {notification && (
      <div className={`fixed top-2 left-2 right-2 bg-${notification.color}-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-center`}>
        <div className="text-sm sm:text-base font-semibold">{notification.message}</div>
      </div>
      )}

      <div className="max-w-lg mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Morse Code Trainer
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">Koch Method</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-3 space-y-3 border border-gray-700">
          <button
            onClick={onTogglePlay}
            className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors ${
              isPlaying ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {isPlaying ? 'Stop' : 'Start'}
          </button>

          {/* Mode Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-gray-700 p-2 rounded-lg">
              <div className="text-sm mb-2">Head Copy Mode</div>
              <button
                onClick={onHeadCopyMode}
                className={`w-full px-4 py-1 rounded ${
                  headCopyMode ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              >
                {headCopyMode ? 'On' : 'Off'}
              </button>
            </div>

            <div className="bg-gray-700 p-2 rounded-lg">
              <div className="text-sm mb-2">Compact</div>
              <button
                onClick={onHideChars}
                className={`w-full px-4 py-1 rounded ${
                  hideChars ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              >
                {hideChars ? 'On' : 'Off'}
              </button>
            </div>
          </div>

          {/* Koch Sequence Controls */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onShuffleKoch}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
            >
              Shuffle Koch
            </button>
            <button
              onClick={onResetKoch}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
            >
              Reset Koch
            </button>
          </div>

          {/* Head Copy Show Answer Button */}
          {headCopyMode && isPlaying && !showAnswer && (
            <button
              onClick={onShowAnswer}
              className="w-full py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700"
            >
              Show Answer
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
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

        {/* Add QSB control */}
        <div className="bg-gray-700 p-2 rounded-lg col-span-2">
            <div className="text-xs text-gray-400 mb-1">QSB Amount (%)</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onQsbChange(-10)}
                className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
                disabled={qsbAmount <= 0}
              >-</button>
              <div className="flex-1">
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-200"
                    style={{ width: `${qsbAmount}%` }}
                  />
                </div>
                <div className="text-center mt-1">{qsbAmount}%</div>
              </div>
              <button
                onClick={() => onQsbChange(10)}
                className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
                disabled={qsbAmount >= 100}
              >+</button>
            </div>
          </div>
          {/* QRM control */}
          <div className="bg-gray-700 p-2 rounded-lg col-span-2">
            <div className="text-xs text-gray-400 mb-1">QRM (Interference) Amount (%)</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onQrmChange(-10)}
                className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
                disabled={qrmAmount <= 0}
              >-</button>
              <div className="flex-1">
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-200"
                    style={{ width: `${qrmAmount}%` }}
                  />
                </div>
                <div className="text-center mt-1">{qrmAmount}%</div>
              </div>
              <button
                onClick={() => onQrmChange(10)}
                className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
                disabled={qrmAmount >= 100}
              >+</button>
            </div>
          </div>
          {!hideChars && (
            <div className="bg-gray-700 p-2 rounded-lg text-sm">
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-400">Available:</div>
                <div className="text-xs text-gray-400">Streak: {consecutiveCorrect}/{advanceThreshold}</div>
              </div>
              <div className="mt-1 font-mono text-center">{availableChars}</div>
            </div>
          )}

          <div className="bg-gray-700 p-2 rounded-lg">
            <div className="font-mono text-2xl tracking-wider text-center p-2 bg-gray-800 rounded">
              {headCopyMode && !showAnswer
                ? '?'
                : userInput.padEnd(currentGroupSize || 1, '_')}
            </div>
            {headCopyMode && showAnswer && currentGroup && (
              <div className="text-center mt-2 text-yellow-400">
                Answer: {currentGroup}
              </div>
            )}
          </div>

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

          {!hideChars && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MorseUI;
