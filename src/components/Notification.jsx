import { useEffect } from 'react';

export const Notification = ({ message, color = 'blue', onDismiss }) => {
  useEffect(() => {
    if (onDismiss) {
      const timer = setTimeout(onDismiss, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onDismiss]);

  if (!message) return null;

  const colors = {
    blue: 'from-blue-500 to-blue-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600',
    green: 'from-green-500 to-green-600',
    gray: 'from-gray-500 to-gray-600'
  };

  return (
    <div className="fixed top-16 left-0 right-0 mx-auto px-4 max-w-lg z-50">
      <div
        className={`bg-gradient-to-r ${colors[color] || colors.blue}
          text-white px-6 py-4 rounded-xl shadow-2xl border border-white/10
          backdrop-blur-sm animate-bounce-in mx-auto`}
      >
        <div className="text-base font-medium text-center break-words">
          {message}
        </div>
      </div>
    </div>
  );
};