export const PresetDropdown = ({ presets, currentPreset, onPresetChange }) => (
  <div className="bg-gray-700 p-2 rounded-lg">
    <div className="text-xs text-gray-400 mb-2">Sequence Type</div>
    <select 
      value={currentPreset?.id} 
      onChange={(e) => onPresetChange(e.target.value)}
      className="w-full p-2 bg-gray-600 rounded-lg border border-gray-500 text-white"
    >
      {presets.map(preset => (
        <option key={preset.id} value={preset.id}>
          {preset.name}
        </option>
      ))}
    </select>
  </div>
);

