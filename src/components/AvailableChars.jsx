export const AvailableChars = ({ availableChars, consecutiveCorrect, advanceThreshold }) => (
  <div className="bg-gray-700/50 p-3 rounded-lg">
    <div className="flex justify-between items-center">
      <div className="text-sm text-gray-400">Available Characters</div>
      <div className="text-sm text-gray-400">Progress: {consecutiveCorrect}/{advanceThreshold}</div>
    </div>
    <div className="mt-2 font-mono text-center tracking-wider text-lg break-words">
      {availableChars}
    </div>
  </div>
);
