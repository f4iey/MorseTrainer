export const LevelProgress = ({ consecutiveCorrect, advanceThreshold }) => (
  <div className="bg-gray-700/50 p-3 rounded-lg">
    <div className="text-xs text-gray-400 mb-2">Level Progress</div>
    <div className="w-full bg-gray-600 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-200 ${consecutiveCorrect > 0 ? 'bg-green-500' : 'bg-gray-600'}`}
        style={{ width: `${(consecutiveCorrect / advanceThreshold) * 100}%` }}
      />
    </div>
    <div className="text-center mt-1">{consecutiveCorrect}/{advanceThreshold}</div>
  </div>
);
