import { InteractiveButton } from './InteractiveButton';

export const AudioControls = ({
  frequency,
  onFrequencyChange,
  wpm,
  onWpmChange
}) => (
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
);
