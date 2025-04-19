import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Popover = ({
  trigger,
  children,
  position = 'bottom',
  triggerType = 'click',
  showArrow = true,
  className = '',
  offset = 8,
  closeOnOutsideClick = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Handle click outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        closeOnOutsideClick &&
        isOpen &&
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, closeOnOutsideClick]);

  // Handle escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  const positionStyles = {
    top: {
      placement: 'bottom-0 translate-y-[-100%] mb-2',
      arrow: 'bottom-[-6px] left-1/2 transform -translate-x-1/2 rotate-45',
    },
    bottom: {
      placement: 'top-0 translate-y-[100%] mt-2',
      arrow: 'top-[-6px] left-1/2 transform -translate-x-1/2 rotate-45',
    },
    left: {
      placement: 'right-0 translate-x-[-100%] mr-2',
      arrow: 'right-[-6px] top-1/2 transform -translate-y-1/2 rotate-45',
    },
    right: {
      placement: 'left-0 translate-x-[100%] ml-2',
      arrow: 'left-[-6px] top-1/2 transform -translate-y-1/2 rotate-45',
    },
  };

  // Get position style based on prop
  const currentPosition = positionStyles[position] || positionStyles.bottom;

  // Setup trigger props based on trigger type
  const triggerProps = {
    ref: triggerRef,
    className: 'inline-block',
  };

  if (triggerType === 'click') {
    triggerProps.onClick = handleToggle;
  } else if (triggerType === 'hover') {
    triggerProps.onMouseEnter = handleOpen;
    triggerProps.onMouseLeave = handleClose;
  }

  return (
    <div className="relative inline-block">
      <div {...triggerProps}>
        {trigger}
      </div>
      
      {isOpen && (
        <div
          ref={popoverRef}
          className={`absolute z-50 ${currentPosition.placement} ${className}`}
          role="tooltip"
          aria-live="polite"
        >
          {showArrow && (
            <div 
              className={`absolute w-3 h-3 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ${currentPosition.arrow}`}
              style={{ 
                boxShadow: '-1px -1px 0 0 rgba(0, 0, 0, 0.1)',
              }}
            />
          )}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

Popover.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  triggerType: PropTypes.oneOf(['click', 'hover']),
  showArrow: PropTypes.bool,
  className: PropTypes.string,
  offset: PropTypes.number,
  closeOnOutsideClick: PropTypes.bool,
};

export default Popover; 