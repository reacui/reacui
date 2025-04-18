import React, { forwardRef, useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const RangeSlider = forwardRef(({
  min = 0,
  max = 100,
  step = 1,
  values = [25, 75],
  label,
  showValues = false,
  disabled = false,
  color = 'blue',
  className = '',
  onChange,
  ...props
}, ref) => {
  const [localValues, setLocalValues] = useState(values);
  const rangeRef = useRef(null);
  
  useEffect(() => {
    setLocalValues(values);
  }, [values]);

  const handleLowerChange = (event) => {
    if (disabled) return;
    
    const newValue = Number(event.target.value);
    const newValues = [Math.min(newValue, localValues[1] - step), localValues[1]];
    
    setLocalValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
  };

  const handleUpperChange = (event) => {
    if (disabled) return;
    
    const newValue = Number(event.target.value);
    const newValues = [localValues[0], Math.max(newValue, localValues[0] + step)];
    
    setLocalValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
  };

  // Handle thumb dragging with useCallback to prevent unnecessary re-creation
  const handleThumbMouseDown = useCallback((event, isLower) => {
    if (disabled) return;
    
    const slider = rangeRef.current;
    if (!slider) return;
    
    const handleMouseMove = (moveEvent) => {
      const rect = slider.getBoundingClientRect();
      const percentage = Math.min(Math.max(0, (moveEvent.clientX - rect.left) / rect.width), 1);
      const newValue = Math.round((percentage * (max - min) + min) / step) * step;
      
      if (isLower) {
        const newValues = [Math.min(newValue, localValues[1] - step), localValues[1]];
        setLocalValues(newValues);
        if (onChange) onChange(newValues);
      } else {
        const newValues = [localValues[0], Math.max(newValue, localValues[0] + step)];
        setLocalValues(newValues);
        if (onChange) onChange(newValues);
      }
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    // Prevent default to avoid text selection during drag
    event.preventDefault();
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Clean up event listeners if component unmounts during drag
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [disabled, min, max, step, localValues, onChange]);

  // Color utilities
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    purple: 'bg-purple-600',
    gray: 'bg-gray-600',
  };

  const selectedColor = colorClasses[color] || colorClasses.blue;
  const selectedBorderColor = {
    blue: 'border-blue-600',
    green: 'border-green-600',
    red: 'border-red-600',
    purple: 'border-purple-600',
    gray: 'border-gray-600',
  }[color] || 'border-blue-600';

  // Calculate percentages for background gradient
  const lowerPercentage = ((localValues[0] - min) / (max - min)) * 100;
  const upperPercentage = ((localValues[1] - min) / (max - min)) * 100;
  
  return (
    <div className={`w-full ${className}`} ref={ref}>
      {(label || showValues) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <label className={`block text-sm font-medium ${disabled ? 'text-gray-500' : 'text-gray-700'}`}>
              {label}
            </label>
          )}
          {showValues && (
            <span className={`text-sm ${disabled ? 'text-gray-500' : 'text-gray-700'}`}>
              {localValues[0]} - {localValues[1]}
            </span>
          )}
        </div>
      )}
      <div className="relative h-2 mt-4 mb-6" ref={rangeRef}>
        {/* Track and colored range */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-lg"></div>
        <div 
          className={`absolute h-2 rounded-lg ${disabled ? 'bg-gray-400' : selectedColor}`}
          style={{
            left: `${lowerPercentage}%`,
            width: `${upperPercentage - lowerPercentage}%`
          }}
        ></div>
        
        {/* Lower thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValues[0]}
          disabled={disabled}
          onChange={handleLowerChange}
          className="absolute w-full h-2 opacity-0 cursor-pointer"
          style={{
            WebkitAppearance: 'none',
            zIndex: 3
          }}
          aria-label="Lower bound"
          {...props}
        />
        
        {/* Upper thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValues[1]}
          disabled={disabled}
          onChange={handleUpperChange}
          className="absolute w-full h-2 opacity-0 cursor-pointer"
          style={{
            WebkitAppearance: 'none',
            zIndex: 4
          }}
          aria-label="Upper bound"
          {...props}
        />
        
        {/* Custom thumbs */}
        <div 
          className={`absolute w-4 h-4 rounded-full bg-white border-2 ${disabled ? 'border-gray-400' : selectedBorderColor} shadow-md cursor-pointer top-1/2 -mt-2`}
          style={{ left: `calc(${lowerPercentage}% - 8px)`, zIndex: 5 }}
          onMouseDown={(e) => handleThumbMouseDown(e, true)}
          aria-hidden="true"
        ></div>
        
        <div 
          className={`absolute w-4 h-4 rounded-full bg-white border-2 ${disabled ? 'border-gray-400' : selectedBorderColor} shadow-md cursor-pointer top-1/2 -mt-2`}
          style={{ left: `calc(${upperPercentage}% - 8px)`, zIndex: 6 }}
          onMouseDown={(e) => handleThumbMouseDown(e, false)}
          aria-hidden="true"
        ></div>
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

RangeSlider.displayName = 'RangeSlider';

RangeSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  values: PropTypes.arrayOf(PropTypes.number),
  label: PropTypes.node,
  showValues: PropTypes.bool,
  disabled: PropTypes.bool,
  color: PropTypes.oneOf(['blue', 'green', 'red', 'purple', 'gray']),
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default RangeSlider; 