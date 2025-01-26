'use client';

export const CharacterDisplay = ({
  headCopyMode,
  showAnswer,
  userInput,
  currentGroupSize,
  currentGroup
}) => (
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
);

