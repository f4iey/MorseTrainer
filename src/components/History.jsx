'use client';

export const History = ({ history }) => (
  <div className="bg-gray-700 rounded-lg">
    <div className="text-xs text-gray-400 p-2">History</div>
    <div className="max-h-32 overflow-y-auto px-2 pb-2">
      {history.slice().reverse().map((entry, i) => (
        <div
          key={i}
          className={`font-mono text-sm p-1 rounded mb-1 flex justify-between items-center ${
            entry.correct
              ? 'bg-green-500/10 text-green-400'
              : 'bg-red-500/10 text-red-400'
          }`}
        >
          <span>{entry.group}</span>
          <span>{entry.correct ? '✓' : '✗'}</span>
        </div>
      ))}
    </div>
  </div>
);
