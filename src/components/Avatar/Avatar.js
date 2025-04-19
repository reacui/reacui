import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Avatar = ({
  src,
  alt,
  size = 'md',
  shape = 'circle',
  className = '',
  initials,
  bgColor = 'bg-primary-500',
  textColor = 'text-white',
  border = false,
  borderColor = 'border-gray-200',
  status,
  statusColor = 'bg-green-500'
}) => {
  const [imageError, setImageError] = useState(false);

  // Handle image loading error
  const handleError = () => {
    setImageError(true);
  };

  // Calculate the initials from the alt text if not provided
  const getInitials = () => {
    if (initials) return initials;
    if (!alt) return '';
    
    return alt
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  // Size classes for the avatar
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  };

  // Shape classes
  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-md',
    rounded: 'rounded-lg',
  };

  // Status dot size based on avatar size
  const statusSizeClasses = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
    '2xl': 'w-4 h-4',
  };

  // Get the correct size class
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const shapeClass = shapeClasses[shape] || shapeClasses.circle;
  const statusSizeClass = statusSizeClasses[size] || statusSizeClasses.md;

  // Border class
  const borderClass = border ? `border-2 ${borderColor}` : '';

  return (
    <div className="relative inline-flex">
      {!imageError && src ? (
        // Image avatar
        <img
          src={src}
          alt={alt}
          className={`${sizeClass} ${shapeClass} ${borderClass} object-cover ${className}`}
          onError={handleError}
        />
      ) : (
        // Fallback to initials avatar
        <div
          className={`${sizeClass} ${shapeClass} ${borderClass} ${bgColor} ${textColor} flex items-center justify-center font-medium ${className}`}
          title={alt}
        >
          {getInitials()}
        </div>
      )}
      
      {status && (
        <span 
          className={`absolute bottom-0 right-0 block ${statusSizeClass} ${statusColor} ${shapeClass === 'rounded-full' ? 'rounded-full' : 'rounded-full'} ring-2 ring-white`}
        ></span>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  shape: PropTypes.oneOf(['circle', 'square', 'rounded']),
  className: PropTypes.string,
  initials: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  border: PropTypes.bool,
  borderColor: PropTypes.string,
  status: PropTypes.bool,
  statusColor: PropTypes.string,
};

export default Avatar; 