import React, { useState, useEffect } from 'react';
import '../styles/ToastNotification.css';

const ToastNotification= ({
  message,
  type,
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={`toast-notification toast-${type}`}>
      <span>{message}</span>
      <button onClick={handleClose} className="toast-close-button">&times;</button>
    </div>
  );
};

export default ToastNotification;
