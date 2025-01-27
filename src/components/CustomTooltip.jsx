export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-800 p-3 rounded border border-gray-700 text-sm">
        <div className="space-y-1">
          <p>Attempt: {data.attempt}</p>
          <p>Accuracy: {data.rollingAccuracy}%</p>
          <p>Level: {data.level}</p>
          <p>Result: {data.isCorrect ? 'Correct' : 'Wrong'}</p>
        </div>
      </div>
    );
  }
  return null;
};

