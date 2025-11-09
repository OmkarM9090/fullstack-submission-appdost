import React from 'react';
import Spinner from './Spinner';

const Button = ({ children, isLoading = false, ...props }) => {
  return (
    <button
      className="w-full py-2 px-4 bg-linkedin-blue text-white rounded-full font-semibold hover:bg-linkedin-hover flex justify-center items-center disabled:opacity-50"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;