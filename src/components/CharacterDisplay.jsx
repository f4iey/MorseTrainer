export const CharacterDisplay = ({
  headCopyMode,
  showAnswer,
  userInput,
  currentGroupSize,
  currentGroup
}) => (
  <div className="bg-gray-700/50 p-4 rounded-lg">
    <div className="font-mono text-3xl tracking-wider text-center p-3 bg-gray-800 rounded">
      {headCopyMode && !showAnswer
        ? '?'
        : userInput.padEnd(currentGroupSize || 1, '_')}
    </div>
    {headCopyMode && showAnswer && currentGroup && (
      <div className="text-center mt-3 text-yellow-400 text-xl">
        Answer: {currentGroup}
      </div>
    )}
  </div>
);

