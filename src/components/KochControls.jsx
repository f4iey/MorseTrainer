export const KochControls = ({ onShuffleKoch, onResetKoch }) => (
  <div className="grid grid-cols-2 gap-3">
    <InteractiveButton
      onClick={onShuffleKoch}
      className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
    >
      Shuffle Sequence
    </InteractiveButton>
    <InteractiveButton
      onClick={onResetKoch}
      className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
    >
      Reset Sequence
    </InteractiveButton>
  </div>
);
