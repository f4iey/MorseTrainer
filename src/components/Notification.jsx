'use client';

export const Notification = ({ notification }) => {
  if (!notification) return null;
  
  return (
    <div className={`fixed top-2 left-2 right-2 bg-${notification.color}-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-center`}>
      <div className="text-sm sm:text-base font-semibold">{notification.message}</div>
    </div>
  );
};

