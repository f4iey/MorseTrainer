export const ScoreDisplay = ({ score }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 p-4 rounded-xl border border-green-700/30 backdrop-blur-sm">
      <div className="text-sm text-green-300 font-medium mb-1">Correct</div>
      <div className="text-green-400 text-2xl font-bold">{score.correct}</div>
    </div>

    <div className="bg-gradient-to-br from-red-900/40 to-red-800/40 p-4 rounded-xl border border-red-700/30 backdrop-blur-sm">
      <div className="text-sm text-red-300 font-medium mb-1">Wrong</div>
      <div className="text-red-400 text-2xl font-bold">{score.wrong}</div>
    </div>

    <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 p-4 rounded-xl border border-blue-700/30 backdrop-blur-sm">
      <div className="text-sm text-blue-300 font-medium mb-1 whitespace-nowrap">Accuracy</div>
      <div className="text-blue-400 text-2xl font-bold">
        {score.correct + score.wrong > 0
          ? Math.round((score.correct / (score.correct + score.wrong)) * 100)
          : 0}%
      </div>
    </div>
  </div>
);