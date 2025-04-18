import React from 'react';

export const Checkbox = ({
  id,
  className = '',
  ...props
}) => {
  return (
    <input
      type="checkbox"
      id={id}
      className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

export default Checkbox; 