'use client';

export const AvailableChars = ({ availableChars, consecutiveCorrect, advanceThreshold }) => (
  <div className="bg-gray-700 p-2 rounded-lg text-sm">
    <div className="flex justify-between items-center">
      <div className="text-xs text-gray-400">Available:</div>
      <div className="text-xs text-gray-400">Streak: {consecutiveCorrect}/{advanceThreshold}</div>
    </div>
    <div className="mt-1 font-mono text-center">{availableChars}</div>
  </div>
);
