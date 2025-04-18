import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

const Select = forwardRef(({
  options = [],
  placeholder = 'Select an option',
  value,
  multiple = false,
  disabled = false,
  className = '',
  onChange,
  ...props
}, ref) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChange = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    const newValue = multiple
      ? Array.from(event.target.selectedOptions, (option) => option.value)
      : event.target.value;

    setSelectedValue(newValue);
    
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <select
      ref={ref}
      value={selectedValue || (multiple ? [] : '')}
      multiple={multiple}
      disabled={disabled}
      onChange={handleChange}
      className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''
      } ${className}`}
      {...props}
    >
      {!multiple && placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

Select.displayName = 'Select';

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func
};

export default Select; 