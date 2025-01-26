'use client';

import { InteractiveButton } from './InteractiveButton';

export const PresetSelector = ({ presets, currentPreset, onPresetChange }) => (
  <div className="bg-gray-700 p-2 rounded-lg">
    <div className="text-xs text-gray-400 mb-2">Sequence Type</div>
    <div className="grid grid-cols-2 gap-2">
      {presets.map((preset) => (
        <InteractiveButton
          key={preset.id}
          onClick={() => onPresetChange(preset.id)}
          className={`px-4 py-2 rounded ${
            currentPreset?.id === preset.id
              ? 'bg-blue-500'
              : 'bg-gray-600 hover:bg-gray-500'
          }`}
        >
          {preset.name}
        </InteractiveButton>
      ))}
    </div>
  </div>
);
