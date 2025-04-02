// components/Notification.jsx
import { useEffect } from 'react';

const Notification = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white animate-fade-in`}>
      <div className="flex items-center">
        <span>{message}</span>
        <button 
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;