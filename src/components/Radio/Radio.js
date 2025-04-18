import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Radio = forwardRef(({
  name,
  value,
  label,
  checked = false,
  disabled = false,
  className = '',
  onChange,
  ...props
}, ref) => {
  // Create a handler that prevents onChange when disabled
  const handleChange = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        ref={ref}
        className={`h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        {...props}
      />
      {label && (
        <label 
          htmlFor={value} 
          className={`ml-2 block text-sm ${
            disabled ? 'text-gray-500' : 'text-gray-900'
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
});

Radio.displayName = 'Radio';

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.node,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func
};

export default Radio; 