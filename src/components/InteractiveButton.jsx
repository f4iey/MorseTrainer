'use client';

import { useState, useEffect, useCallback } from 'react';

export const InteractiveButton = ({ children, onClick, className, disabled }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [touchIdentifier, setTouchIdentifier] = useState(null);

  const handleTouchStart = useCallback((e) => {
    if (disabled || touchIdentifier !== null) return;
    e.preventDefault();
    setIsPressed(true);
    setTouchIdentifier(e.changedTouches[0].identifier);
  }, [disabled, touchIdentifier]);

  const handleTouchMove = useCallback((e) => {
    if (!isPressed || touchIdentifier === null) return;
    
    const touch = Array.from(e.touches).find(t => t.identifier === touchIdentifier);
    if (!touch) return;

    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!element?.contains(e.currentTarget)) {
      setIsPressed(false);
      setTouchIdentifier(null);
    }
  }, [isPressed, touchIdentifier]);

  const handleTouchEnd = useCallback((e) => {
    if (touchIdentifier === null) return;
    e.preventDefault();
    
    const touch = Array.from(e.changedTouches).find(t => t.identifier === touchIdentifier);
    if (!touch) return;

    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element?.contains(e.currentTarget) && isPressed) {
      onClick();
    }
    
    setIsPressed(false);
    setTouchIdentifier(null);
  }, [isPressed, touchIdentifier, onClick]);

  const handleMouseDown = useCallback((e) => {
    if (disabled || touchIdentifier !== null) return;
    setIsPressed(true);
  }, [disabled, touchIdentifier]);

  const handleMouseUp = useCallback((e) => {
    if (touchIdentifier !== null) return;
    if (isPressed) {
      onClick();
    }
    setIsPressed(false);
  }, [isPressed, onClick, touchIdentifier]);

  const handleMouseLeave = useCallback(() => {
    if (touchIdentifier === null) {
      setIsPressed(false);
    }
  }, [touchIdentifier]);

  useEffect(() => {
    if (disabled) {
      setIsPressed(false);
      setTouchIdentifier(null);
    }
  }, [disabled]);

  useEffect(() => {
    const handleTouchCancel = () => {
      setIsPressed(false);
      setTouchIdentifier(null);
    };

    const handleGlobalMouseUp = () => {
      if (touchIdentifier === null) {
        setIsPressed(false);
      }
    };

    window.addEventListener('touchcancel', handleTouchCancel);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('touchcancel', handleTouchCancel);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [touchIdentifier]);

  return (
    <button
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`${className} transition-transform duration-100 ${
        isPressed ? 'transform scale-90 brightness-75' : ''
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
