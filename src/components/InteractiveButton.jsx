'use client';

import { useState } from 'react';

export const InteractiveButton = ({ children, onClick, className, disabled }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [pressedChar, setPressedChar] = useState(null);

  const handleTouchStart = (e) => {
    e.preventDefault();
    if (!disabled) {
      setIsPressed(true);
      setPressedChar(children);
    }
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    if (isPressed && pressedChar === children) {
      onClick();
    }
    setIsPressed(false);
    setPressedChar(null);
  };

  const handleTouchMove = (e) => {
    if (isPressed) {
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element?.textContent !== pressedChar) {
        setIsPressed(false);
      }
    }
  };

  return (
    <button
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => {
        if (isPressed) {
          onClick();
          setIsPressed(false);
        }
      }}
      onMouseLeave={() => setIsPressed(false)}
      className={`${className} transition-transform duration-100 ${
        isPressed ? 'transform scale-90 brightness-75' : ''
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

