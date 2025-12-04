import React, { useState, useEffect } from 'react';

const Alert = ({ message, type = 'error', onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        if (onClose) onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!show || !message) return null;

  const bgColor = type === 'error' ? 'bg-red-100' : 'bg-green-100';
  const textColor = type === 'error' ? 'text-red-800' : 'text-green-800';

  return (
    <div className={`${bgColor} ${textColor} px-4 py-3 rounded relative mb-4 flex items-center justify-between`}>
      <div>{message}</div>
      <button
        onClick={() => {
          setShow(false);
          if (onClose) onClose();
        }}
        className="text-2xl leading-none hover:opacity-75"
      >
        &times;
      </button>
    </div>
  );
};

export default Alert;

