import { useState } from 'react';

export const InteractiveButton = ({ children, onClick, className, disabled }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      className={`${className} transition-all duration-100
        ${isPressed ? 'transform scale-95 brightness-90' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
