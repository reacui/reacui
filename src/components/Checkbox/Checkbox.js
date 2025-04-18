import React from 'react';

export const Checkbox = ({
  id,
  className = '',
  disabled = false,
  onChange,
  ...props
}) => {
  // Create a handler that prevents onChange when disabled
  const handleChange = (event) => {
    if (disabled) {
      // Prevent the event from propagating when disabled
      event.preventDefault();
      return;
    }
    
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <input
      type="checkbox"
      id={id}
      className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${className}`}
      disabled={disabled}
      onChange={handleChange}
      {...props}
    />
  );
};

export default Checkbox; 