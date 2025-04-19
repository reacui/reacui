import React, { useState, useEffect } from 'react';

export const Toast = ({
  message,
  description = '',
  variant = 'info',
  position = 'top-right',
  duration = 5000, // Auto-dismiss after 5 seconds by default
  dismissible = true,
  icon = null,
  action = null,
  className = '',
  onDismiss,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  // Auto-dismiss timer
  useEffect(() => {
    let timer;
    if (duration > 0) {
      timer = setTimeout(() => {
        dismiss();
      }, duration);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  // Handling dismiss animation
  const dismiss = () => {
    setIsLeaving(true);
    const animationDuration = 300;
    setTimeout(() => {
      setIsVisible(false);
      if (onDismiss) {
        onDismiss();
      }
    }, animationDuration);
  };

  if (!isVisible) {
    return null;
  }

  // Base classes
  const baseClasses = 'flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow-lg text-sm font-medium';
  
  // Variant classes
  const variantClasses = {
    info: 'bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    success: 'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    danger: 'bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  };

  // Position classes
  const positionClasses = {
    'top-right': 'fixed top-5 right-5',
    'top-left': 'fixed top-5 left-5',
    'bottom-right': 'fixed bottom-5 right-5',
    'bottom-left': 'fixed bottom-5 left-5',
    'top-center': 'fixed top-5 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'fixed bottom-5 left-1/2 transform -translate-x-1/2',
  };

  // Animation classes
  const animationClasses = isLeaving
    ? 'animate-fade-out opacity-0 transition-opacity duration-300'
    : 'animate-fade-in opacity-100 transition-opacity duration-300';

  // Default icons
  const defaultIcons = {
    info: (
      <svg className="w-5 h-5 mr-3 text-blue-700 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
      </svg>
    ),
    success: (
      <svg className="w-5 h-5 mr-3 text-green-700 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5 mr-3 text-yellow-700 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
      </svg>
    ),
    danger: (
      <svg className="w-5 h-5 mr-3 text-red-700 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
      </svg>
    ),
  };

  // Use custom icon or default icon
  const iconToShow = icon !== null ? icon : defaultIcons[variant];

  // Close button if dismissible
  const closeButton = dismissible && (
    <button
      type="button"
      className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
      aria-label="Close"
      onClick={dismiss}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
      </svg>
    </button>
  );

  return (
    <div
      role="alert"
      className={`${baseClasses} ${variantClasses[variant]} ${positionClasses[position]} ${animationClasses} ${className}`}
      {...props}
    >
      {iconToShow}
      <div className="flex-grow">
        <div className="font-medium">{message}</div>
        {description && <div className="mt-1 text-sm opacity-90">{description}</div>}
      </div>
      {action}
      {closeButton}
    </div>
  );
};

export default Toast; 