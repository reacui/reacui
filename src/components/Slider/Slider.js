import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Slider = forwardRef(({
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  label,
  showValue = false,
  disabled = false,
  className = '',
  onChange,
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

  // Calculate percentage for background gradient
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <label className={`block text-sm font-medium ${disabled ? 'text-gray-500' : 'text-gray-700'}`}>
              {label}
            </label>
          )}
          {showValue && (
            <span className={`text-sm ${disabled ? 'text-gray-500' : 'text-gray-700'}`}>
              {value}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          ref={ref}
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{
            background: disabled 
              ? `linear-gradient(to right, #9ca3af ${percentage}%, #e5e7eb ${percentage}%)` 
              : `linear-gradient(to right, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%)`
          }}
          {...props}
        />
      </div>
      {min !== undefined && max !== undefined && (
        <div className="flex justify-between mt-1">
          <span className={`text-xs ${disabled ? 'text-gray-500' : 'text-gray-500'}`}>{min}</span>
          <span className={`text-xs ${disabled ? 'text-gray-500' : 'text-gray-500'}`}>{max}</span>
        </div>
      )}
    </div>
  );
});

Slider.displayName = 'Slider';

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  label: PropTypes.node,
  showValue: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default Slider; 