import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({
  children,
  content,
  position = 'top',
  delay = 200,
  showArrow = true,
  className = '',
  color = 'dark',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({});
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timerRef = useRef(null);

  // Calculate tooltip position based on trigger element
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    let top, left;
    
    switch (position) {
      case 'top':
        top = -tooltipRect.height - 8;
        left = (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.height + 8;
        left = (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = -tooltipRect.width - 8;
        break;
      case 'right':
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.width + 8;
        break;
      default:
        top = -tooltipRect.height - 8;
        left = (triggerRect.width - tooltipRect.width) / 2;
    }
    
    setTooltipPosition({ top, left });
  };

  // Show tooltip with delay
  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
      // Recalculate position after tooltip becomes visible
      setTimeout(calculatePosition, 0);
    }, delay);
  };

  // Hide tooltip and clear delay timer
  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVisible(false);
  };

  // Update position when tooltip visibility changes
  useEffect(() => {
    if (isVisible) {
      calculatePosition();
    }
  }, [isVisible]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Different arrow positions based on tooltip position
  const arrowStyles = {
    top: 'bottom-[-4px] left-1/2 transform -translate-x-1/2 rotate-45',
    bottom: 'top-[-4px] left-1/2 transform -translate-x-1/2 rotate-45',
    left: 'right-[-4px] top-1/2 transform -translate-y-1/2 rotate-45',
    right: 'left-[-4px] top-1/2 transform -translate-y-1/2 rotate-45',
  };

  // Color variants
  const colorVariants = {
    dark: 'bg-gray-800 text-white',
    light: 'bg-white text-gray-800 border border-gray-200',
    primary: 'bg-primary-600 text-white',
  };

  return (
    <div className="inline-block relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div ref={triggerRef}>
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={`absolute z-50 px-2 py-1 text-sm rounded shadow-sm whitespace-nowrap ${colorVariants[color] || colorVariants.dark} ${className}`}
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          {content}
          {showArrow && (
            <div 
              className={`absolute h-2 w-2 ${colorVariants[color] || colorVariants.dark} ${arrowStyles[position] || arrowStyles.top}`}
              style={color === 'light' ? { borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' } : {}}
            />
          )}
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  delay: PropTypes.number,
  showArrow: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.oneOf(['dark', 'light', 'primary']),
};

export default Tooltip; 