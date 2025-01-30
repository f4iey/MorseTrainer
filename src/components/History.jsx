export const History = ({ history }) => (
  <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/50">
    <div className="text-sm text-gray-300 font-medium p-4 border-b border-gray-700/50">History</div>
    <div className="max-h-48 overflow-y-auto px-4 py-3 space-y-2">
      {history.slice().reverse().map((entry, i) => (
        <div
          key={i}
          className={`font-mono p-3 rounded-lg flex justify-between items-center
            transition-all duration-300 ${
            entry.correct
              ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/10 text-green-400 border border-green-500/30'
              : 'bg-gradient-to-r from-red-500/20 to-pink-500/10 text-red-400 border border-red-500/30'
          }`}
        >
          <span className="text-lg">{entry.group}</span>
          <span className="text-xl">{entry.correct ? '✓' : '✗'}</span>
        </div>
      ))}
    </div>
  </div>
);