import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Switch = forwardRef(({
  checked = false,
  disabled = false,
  label,
  labelPosition = 'right',
  onChange,
  color = 'blue',
  className = '',
  id,
  ...props
}, ref) => {
  const handleChange = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    
    if (onChange) {
      onChange(event);
    }
  };

  // Color utilities
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    purple: 'bg-purple-600',
    gray: 'bg-gray-600',
  };

  const selectedColor = colorClasses[color] || colorClasses.blue;

  // Element ID generation
  const switchId = id || `switch-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={`inline-flex items-center ${className}`}>
      {label && labelPosition === 'left' && (
        <label 
          htmlFor={switchId} 
          className={`mr-2 text-sm ${disabled ? 'text-gray-500' : 'text-gray-900'}`}
        >
          {label}
        </label>
      )}
      <div className="relative inline-block">
        <input
          type="checkbox"
          id={switchId}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
          ref={ref}
          {...props}
        />
        <div 
          className={`w-10 h-5 rounded-full transition-colors ${checked ? `${selectedColor}` : 'bg-gray-300'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={!disabled ? handleChange : undefined}
        >
          <div 
            className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${checked ? 'transform translate-x-5' : ''} ${disabled ? 'cursor-not-allowed' : ''}`}
          />
        </div>
      </div>
      {label && labelPosition === 'right' && (
        <label 
          htmlFor={switchId} 
          className={`ml-2 text-sm ${disabled ? 'text-gray-500' : 'text-gray-900'}`}
        >
          {label}
        </label>
      )}
    </div>
  );
});

Switch.displayName = 'Switch';

Switch.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.node,
  labelPosition: PropTypes.oneOf(['left', 'right']),
  onChange: PropTypes.func,
  color: PropTypes.oneOf(['blue', 'green', 'red', 'purple', 'gray']),
  className: PropTypes.string,
  id: PropTypes.string,
};

export default Switch; 