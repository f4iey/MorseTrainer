export const Notification = ({ notification }) => {
  if (!notification) return null;
  
  return (
    <div className={`fixed top-14 left-4 right-4 bg-${notification.color}-500 
      text-white px-4 py-3 rounded-lg shadow-lg z-40 text-center
      animate-fade-in-down`}>
      <div className="text-sm font-medium">{notification.message}</div>
    </div>
  );
};
