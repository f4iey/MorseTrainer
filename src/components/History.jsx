export const History = ({ history }) => (
  <div className="bg-gray-700/50 rounded-lg">
    <div className="text-sm text-gray-400 p-3">History</div>
    <div className="max-h-40 overflow-y-auto px-3 pb-3 space-y-2">
      {history.slice().reverse().map((entry, i) => (
        <div
          key={i}
          className={`font-mono p-2 rounded flex justify-between items-center ${
            entry.correct
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          }`}
        >
          <span>{entry.group}</span>
          <span>{entry.correct ? '✓' : '✗'}</span>
        </div>
      ))}
    </div>
  </div>
);

