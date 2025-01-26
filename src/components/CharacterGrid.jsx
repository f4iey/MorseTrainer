'use client';

import { InteractiveButton } from './InteractiveButton';

export const CharacterGrid = ({ availableChars, onCharacterInput }) => (
  <div className="bg-gray-700 p-2 rounded-lg">
    <div className="flex flex-wrap gap-1 justify-center">
      {availableChars.split('').map((char) => (
        <InteractiveButton
          key={char}
          onClick={() => onCharacterInput(char)}
          className="w-10 h-10 flex items-center justify-center bg-gray-600
                   rounded text-lg font-mono hover:bg-gray-500"
        >
          {char}
        </InteractiveButton>
      ))}
    </div>
  </div>
);
