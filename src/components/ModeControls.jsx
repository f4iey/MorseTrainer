'use client';

import { InteractiveButton } from './InteractiveButton';

export const ModeControls = ({
  headCopyMode,
  onHeadCopyMode,
  hideChars,
  onHideChars
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
    <div className="bg-gray-700 p-2 rounded-lg">
      <div className="text-sm mb-2">Head Copy Mode</div>
      <InteractiveButton
        onClick={onHeadCopyMode}
        className={`w-full px-4 py-1 rounded ${
          headCopyMode ? 'bg-blue-500' : 'bg-gray-600'
        }`}
      >
        {headCopyMode ? 'On' : 'Off'}
      </InteractiveButton>
    </div>

    <div className="bg-gray-700 p-2 rounded-lg">
      <div className="text-sm mb-2">Compact Mode</div>
      <InteractiveButton
        onClick={onHideChars}
        className={`w-full px-4 py-1 rounded ${
          hideChars ? 'bg-blue-500' : 'bg-gray-600'
        }`}
      >
        {hideChars ? 'On' : 'Off'}
      </InteractiveButton>
    </div>
  </div>
);
