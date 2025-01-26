'use client';

import { InteractiveButton } from './InteractiveButton';

export const QualityControls = ({
  qsbAmount,
  onQsbChange,
  qrmAmount,
  onQrmChange
}) => (
  <>
    <div className="bg-gray-700 p-2 rounded-lg col-span-2">
      <div className="text-xs text-gray-400 mb-1">QSB Amount (%)</div>
      <div className="flex items-center gap-2">
        <InteractiveButton
          onClick={() => onQsbChange(-10)}
          className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
          disabled={qsbAmount <= 0}
        >-</InteractiveButton>
        <div className="flex-1">
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-200"
              style={{ width: `${qsbAmount}%` }}
            />
          </div>
          <div className="text-center mt-1">{qsbAmount}%</div>
        </div>
        <InteractiveButton
          onClick={() => onQsbChange(10)}
          className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
          disabled={qsbAmount >= 100}
        >+</InteractiveButton>
      </div>
    </div>

    <div className="bg-gray-700 p-2 rounded-lg col-span-2">
      <div className="text-xs text-gray-400 mb-1">QRM (Interference) Amount (%)</div>
      <div className="flex items-center gap-2">
        <InteractiveButton
          onClick={() => onQrmChange(-10)}
          className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
          disabled={qrmAmount <= 0}
        >-</InteractiveButton>
        <div className="flex-1">
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full transition-all duration-200"
              style={{ width: `${qrmAmount}%` }}
            />
          </div>
          <div className="text-center mt-1">{qrmAmount}%</div>
        </div>
        <InteractiveButton
          onClick={() => onQrmChange(10)}
          className="w-8 h-8 rounded bg-gray-600 disabled:opacity-50"
          disabled={qrmAmount >= 100}
        >+</InteractiveButton>
      </div>
    </div>
  </>
);
