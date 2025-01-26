'use client';

export const ScoreDisplay = ({ score }) => (
  <div className="grid grid-cols-3 gap-2">
    <div className="bg-gray-700 p-2 rounded-lg text-center">
      <div className="text-xs text-gray-400">Correct</div>
      <div className="text-green-400">{score.correct}</div>
    </div>
    <div className="bg-gray-700 p-2 rounded-lg text-center">
      <div className="text-xs text-gray-400">Wrong</div>
      <div className="text-red-400">{score.wrong}</div>
    </div>
    <div className="bg-gray-700 p-2 rounded-lg text-center">
      <div className="text-xs text-gray-400">Accuracy</div>
      <div className="text-blue-400">
        {score.correct + score.wrong > 0
          ? Math.round((score.correct / (score.correct + score.wrong)) * 100)
          : 0}%
      </div>
    </div>
  </div>
);
