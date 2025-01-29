import { InteractiveButton } from './InteractiveButton';

export const CharacterGrid = ({ availableChars, onCharacterInput, currentPreset }) => {
  let chars = [];
  const numberToLetter = {
    '1': 'T', '2': 'A', '3': 'U', '4': 'V', '5': '5',
    '6': '6', '7': 'B', '8': 'D', '9': 'N', '0': 'O'
  };

  if (currentPreset?.id === 'cut_numbers') {
    chars = ['1','2','3','4','5','6','7','8','9','0'];
  } else {
    chars = Array.isArray(availableChars) ? availableChars : availableChars.split('');
    chars = [...new Set(chars.join('').replace(/\s+/g, '').split(''))].sort();
  }

  return (
    <div className="bg-gray-700/50 p-3 rounded-lg overflow-x-hidden">
      <div className="flex flex-wrap gap-2 justify-center">
        {chars.map((char, index) => (
          <InteractiveButton
            key={`${char}-${index}`}
            onClick={() => onCharacterInput(currentPreset?.id === 'cut_numbers' ? numberToLetter[char] : char)}
            className="min-w-14 h-12 px-3 flex items-center justify-center bg-gray-600 hover:bg-gray-500
                     rounded text-lg font-mono transition-colors"
          >
            {currentPreset?.id === 'cut_numbers' ? `${char} (${numberToLetter[char]})` : char}
          </InteractiveButton>
        ))}
      </div>
    </div>
  );
};
