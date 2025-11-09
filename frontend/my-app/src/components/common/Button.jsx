import React from 'react';
import Spinner from './Spinner';

const Button = ({ children, isLoading = false, ...props }) => {
  return (
    <button
      className="w-full py-2 px-4 bg-linkedin-blue text-white rounded-2xl font-semibold hover:bg-linkedin-hover transition-all duration-200 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gray-300/50 dark:shadow-blue-900/30"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;