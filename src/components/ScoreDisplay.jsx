export const ScoreDisplay = ({ score }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    <div className="bg-gray-700/50 p-3 rounded-lg text-center">
      <div className="text-sm text-gray-400 mb-1">Correct</div>
      <div className="text-green-400 text-xl">{score.correct}</div>
    </div>
    <div className="bg-gray-700/50 p-3 rounded-lg text-center">
      <div className="text-sm text-gray-400 mb-1">Wrong</div>
      <div className="text-red-400 text-xl">{score.wrong}</div>
    </div>
    <div className="bg-gray-700/50 p-3 rounded-lg text-center">
      <div className="text-sm text-gray-400 mb-1 whitespace-nowrap">Accuracy</div>
      <div className="text-blue-400 text-xl">
        {score.correct + score.wrong > 0
          ? Math.round((score.correct / (score.correct + score.wrong)) * 100)
          : 0}%
      </div>
    </div>
  </div>
);
