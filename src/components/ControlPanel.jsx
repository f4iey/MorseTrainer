import { InteractiveButton } from './InteractiveButton';

export const ControlPanel = ({
  currentLevel,
  onLevelChange,
  groupSize,
  onGroupSizeChange,
  frequency,
  onFrequencyChange,
  wpm,
  onWpmChange,
  maxLevel,
  advanceThreshold,
  onAdvanceThresholdChange,
  consecutiveCorrect
}) => (
  <div className="space-y-3">
    {/* Level and Group Size controls */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="bg-gray-700/50 p-3 rounded-lg">
        <div className="text-xs text-gray-400 mb-2">Level</div>
        <div className="flex items-center gap-2">
          <InteractiveButton
            onClick={() => onLevelChange(-1)}
            className="w-10 h-10 rounded bg-gray-600 disabled:opacity-50"
            disabled={currentLevel <= 1}
          >-</InteractiveButton>
          <span className="flex-1 text-center text-lg">{currentLevel}/{maxLevel}</span>
          <InteractiveButton
            onClick={() => onLevelChange(1)}
            className="w-10 h-10 rounded bg-gray-600 disabled:opacity-50"
            disabled={currentLevel >= maxLevel}
          >+</InteractiveButton>
        </div>
      </div>

      <div className="bg-gray-700/50 p-3 rounded-lg">
        <div className="text-xs text-gray-400 mb-2">Group Size</div>
        <div className="flex items-center gap-2">
          <InteractiveButton
            onClick={() => onGroupSizeChange(-1)}
            className="w-10 h-10 rounded bg-gray-600 disabled:opacity-50"
            disabled={groupSize <= 1}
          >-</InteractiveButton>
          <span className="flex-1 text-center text-lg">{groupSize}</span>
          <InteractiveButton
            onClick={() => onGroupSizeChange(1)}
            className="w-10 h-10 rounded bg-gray-600 disabled:opacity-50"
            disabled={groupSize >= 10}
          >+</InteractiveButton>
        </div>
      </div>
    </div>

    {/* Required successes */}
    <div className="bg-gray-700/50 p-3 rounded-lg">
      <div className="text-xs text-gray-400 mb-2">Required Successes</div>
      <div className="flex items-center gap-2">
        <InteractiveButton
          onClick={() => onAdvanceThresholdChange(-1)}
          className="w-10 h-10 rounded bg-gray-600 disabled:opacity-50"
          disabled={advanceThreshold <= 1}
        >-</InteractiveButton>
        <span className="flex-1 text-center text-lg">{advanceThreshold}</span>
        <InteractiveButton
          onClick={() => onAdvanceThresholdChange(1)}
          className="w-10 h-10 rounded bg-gray-600 disabled:opacity-50"
          disabled={advanceThreshold >= 10}
        >+</InteractiveButton>
      </div>
    </div>

    {/* Tone and WPM controls */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="bg-gray-700/50 p-3 rounded-lg">
        <div className="text-xs text-gray-400 mb-2">Tone (Hz)</div>
        <div className="flex items-center gap-2">
          <InteractiveButton
            onClick={() => onFrequencyChange(-50)}
            className="w-10 h-10 rounded bg-gray-600 disabled:opacity-50"
            disabled={frequency <= 400}
          >-</InteractiveButton>
          <span className="flex-1 text-center text-lg">{frequency}</span>
          <InteractiveButton
            onClick={() => onFrequencyChange(50)}
            className="w-10 h-10 rounded bg-gray-600 disabled:opacity-50"
            disabled={frequency >= 1000}
          >+</InteractiveButton>
        </div>
      </div>

      <div className="bg-gray-700/50 p-3 rounded-lg">
        <div className="text-xs text-gray-400 mb-2">Speed (WPM)</div>
        <div className="flex items-center gap-2">
          <InteractiveButton
            onClick={() => onWpmChange(-1)}
            className="w-10 h-10 rounded bg-gray-600 disabled:opacity-50"
            disabled={wpm <= 5}
          >-</InteractiveButton>
          <span className="flex-1 text-center text-lg">{wpm}</span>
          <InteractiveButton
            onClick={() => onWpmChange(1)}
            className="w-10 h-10 rounded bg-gray-600 disabled:opacity-50"
            disabled={wpm >= 80}
          >+</InteractiveButton>
        </div>
      </div>
    </div>
  </div>
);
