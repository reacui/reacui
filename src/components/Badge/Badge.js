import React from 'react';

export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  // Base classes for all badges
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };
  
  // Dark mode adjustments
  const darkClasses = {
    primary: 'dark:bg-primary-900 dark:text-primary-300',
    secondary: 'dark:bg-secondary-900 dark:text-secondary-300',
    success: 'dark:bg-green-900 dark:text-green-300',
    danger: 'dark:bg-red-900 dark:text-red-300',
    warning: 'dark:bg-yellow-900 dark:text-yellow-300',
    info: 'dark:bg-blue-900 dark:text-blue-300',
  };
  
  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${darkClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge; 