import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-lg shadow-gray-300/50 dark:shadow-blue-900/30 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-200">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200">
            <XMarkIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <div className="p-4 text-gray-600 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;