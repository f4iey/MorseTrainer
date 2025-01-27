export const ModeControls = ({
  headCopyMode,
  onHeadCopyMode,
  hideChars,
  onHideChars
}) => (
  <div className="grid grid-cols-2 gap-3">
    <div className="bg-gray-700/50 p-3 rounded-lg">
      <div className="text-sm mb-2">Head Copy Mode</div>
      <InteractiveButton
        onClick={onHeadCopyMode}
        className={`w-full px-4 py-2 rounded transition-colors ${
          headCopyMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'
        }`}
      >
        {headCopyMode ? 'On' : 'Off'}
      </InteractiveButton>
    </div>

    <div className="bg-gray-700/50 p-3 rounded-lg">
      <div className="text-sm mb-2">Compact Mode</div>
      <InteractiveButton
        onClick={onHideChars}
        className={`w-full px-4 py-2 rounded transition-colors ${
          hideChars ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'
        }`}
      >
        {hideChars ? 'On' : 'Off'}
      </InteractiveButton>
    </div>
  </div>
);
