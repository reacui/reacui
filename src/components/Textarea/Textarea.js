import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Textarea = forwardRef(({
  className = '',
  disabled = false,
  id,
  maxLength,
  minLength,
  name,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  required = false,
  rows = 3,
  cols,
  value,
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

  return (
    <textarea
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        disabled ? 'bg-gray-100 opacity-70 cursor-not-allowed' : ''
      } ${className}`}
      cols={cols}
      disabled={disabled}
      id={id}
      maxLength={maxLength}
      minLength={minLength}
      name={name}
      onBlur={onBlur}
      onChange={handleChange}
      onFocus={onFocus}
      placeholder={placeholder}
      ref={ref}
      required={required}
      rows={rows}
      value={value}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  className: PropTypes.string,
  cols: PropTypes.number,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
  value: PropTypes.string,
};

export default Textarea; 