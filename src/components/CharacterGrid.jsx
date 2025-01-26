'use client';

import { InteractiveButton } from './InteractiveButton';
import { useEffect } from 'react';

export const CharacterGrid = ({ availableChars, onCharacterInput, currentPreset }) => {
  let chars = [];
  const numberToLetter = {
    '1': 'T',
    '2': 'A',
    '3': 'U',
    '4': 'V',
    '5': '5',
    '6': '6',
    '7': 'B',
    '8': 'D',
    '9': 'N',
    '0': 'O'
  };
  
  if (currentPreset?.id === 'cut_numbers') {
    chars = ['1','2','3','4','5','6','7','8','9','0'];
  } else {
    chars = Array.isArray(availableChars) ? availableChars : availableChars.split('');
    chars = [...new Set(chars.join('').replace(/\s+/g, '').split(''))].sort();
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (currentPreset?.id === 'cut_numbers' && /[0-9]/.test(e.key)) {
        onCharacterInput(numberToLetter[e.key]);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [currentPreset, onCharacterInput]);

  return (
    <div className="bg-gray-700 p-2 rounded-lg">
      <div className="flex flex-wrap gap-1 justify-center">
        {chars.map((char, index) => (
          <InteractiveButton
            key={`${char}-${index}`}
            onClick={() => onCharacterInput(currentPreset?.id === 'cut_numbers' ? numberToLetter[char] : char)}
            className="min-w-12 h-10 px-2 flex items-center justify-center bg-gray-600 rounded text-base font-mono hover:bg-gray-500"
          >
            {currentPreset?.id === 'cut_numbers' ? `${char} (${numberToLetter[char]})` : char}
          </InteractiveButton>
        ))}
      </div>
    </div>
  );
};
