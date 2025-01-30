export const LevelProgress = ({ consecutiveCorrect, advanceThreshold }) => (
  <div className="bg-gray-800/60 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
    <div className="text-sm text-gray-300 font-medium mb-3">Level Progress</div>
    <div className="w-full bg-gray-900 rounded-full h-3 shadow-inner overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${
          consecutiveCorrect > 0
            ? 'bg-gradient-to-r from-green-500 to-emerald-400 animate-pulse-subtle'
            : 'bg-gray-800'
        }`}
        style={{
          width: `${(consecutiveCorrect / advanceThreshold) * 100}%`,
        }}
      />
    </div>
    <div className="flex justify-between items-center mt-2">
      <div className="text-sm font-medium">
        <span className="text-green-400 animate-pulse-subtle">{consecutiveCorrect}</span>
        <span className="text-gray-400">/{advanceThreshold}</span>
      </div>
      <div className="text-sm font-medium text-gray-400">
        {Math.round((consecutiveCorrect / advanceThreshold) * 100)}% Complete
      </div>
    </div>
  </div>
);