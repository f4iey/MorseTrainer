'use client';

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
  maxLevel
}) => (
  <div className="grid grid-cols-2 gap-2">
    <div className="bg-gray-700 p-2 rounded-lg">
      <div className="text-xs text-gray-400 mb-1">Level</div>
      <div className="flex items-center gap-2">
        <InteractiveButton
          onClick={() => onLevelChange(-1)}
          className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
          disabled={currentLevel <= 1}
        >-</InteractiveButton>
        <span className="flex-1 text-center">{currentLevel}</span>
        <InteractiveButton
          onClick={() => onLevelChange(1)}
          className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
          disabled={currentLevel >= maxLevel}
        >+</InteractiveButton>
      </div>
    </div>

    <div className="bg-gray-700 p-2 rounded-lg">
      <div className="text-xs text-gray-400 mb-1">Max Group Size</div>
      <div className="flex items-center gap-2">
        <InteractiveButton
          onClick={() => onGroupSizeChange(-1)}
          className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
          disabled={groupSize <= 1}
        >-</InteractiveButton>
        <span className="flex-1 text-center">{groupSize}</span>
        <InteractiveButton
          onClick={() => onGroupSizeChange(1)}
          className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
          disabled={groupSize >= 10}
        >+</InteractiveButton>
      </div>
    </div>

    <div className="bg-gray-700 p-2 rounded-lg">
      <div className="text-xs text-gray-400 mb-1">Tone (Hz)</div>
      <div className="flex items-center gap-2">
        <InteractiveButton
          onClick={() => onFrequencyChange(-50)}
          className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
          disabled={frequency <= 400}
        >-</InteractiveButton>
        <span className="flex-1 text-center">{frequency}</span>
        <InteractiveButton
          onClick={() => onFrequencyChange(50)}
          className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
          disabled={frequency >= 1000}
        >+</InteractiveButton>
      </div>
    </div>

    <div className="bg-gray-700 p-2 rounded-lg">
      <div className="text-xs text-gray-400 mb-1">WPM</div>
      <div className="flex items-center gap-2">
        <InteractiveButton
          onClick={() => onWpmChange(-1)}
          className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
          disabled={wpm <= 5}
        >-</InteractiveButton>
        <span className="flex-1 text-center">{wpm}</span>
        <InteractiveButton
          onClick={() => onWpmChange(1)}
          className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
          disabled={wpm >= 80}
        >+</InteractiveButton>
      </div>
    </div>
  </div>
);

