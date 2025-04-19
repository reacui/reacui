import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const AccordionItem = ({
  title,
  content,
  icon,
  isOpen,
  onClick,
  allowMultiple,
  index,
  className = '',
  borderColor = 'border-gray-200',
  iconColor = 'text-gray-500',
  hoverColor = 'hover:bg-gray-50',
  activeColor = 'bg-gray-50',
}) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className={`border-b ${borderColor} ${className}`}>
      <button
        className={`flex items-center justify-between w-full py-4 px-5 text-left font-medium transition-colors ${
          hoverColor
        } ${isOpen ? activeColor : ''}`}
        onClick={() => onClick(index)}
        aria-expanded={isOpen}
        id={`accordion-header-${index}`}
        aria-controls={`accordion-content-${index}`}
      >
        <div className="flex items-center">
          {icon && <span className="mr-3">{icon}</span>}
          <span>{title}</span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${iconColor} ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        id={`accordion-content-${index}`}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: `${height}px` }}
        role="region"
        aria-labelledby={`accordion-header-${index}`}
        data-state={isOpen ? 'open' : 'closed'}
      >
        <div ref={contentRef} className="p-5">
          {content}
        </div>
      </div>
    </div>
  );
};

const Accordion = ({
  items,
  defaultOpen = [],
  allowMultiple = false,
  className = '',
  itemClassName = '',
  borderColor = 'border-gray-200',
  iconColor = 'text-gray-500',
  hoverColor = 'hover:bg-gray-50',
  activeColor = 'bg-gray-50',
}) => {
  const [openItems, setOpenItems] = useState(defaultOpen);

  const handleItemClick = (index) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={`border border-gray-200 rounded-lg ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          icon={item.icon}
          isOpen={openItems.includes(index)}
          onClick={handleItemClick}
          allowMultiple={allowMultiple}
          index={index}
          className={itemClassName}
          borderColor={borderColor}
          iconColor={iconColor}
          hoverColor={hoverColor}
          activeColor={activeColor}
        />
      ))}
    </div>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      content: PropTypes.node.isRequired,
      icon: PropTypes.node,
    })
  ).isRequired,
  defaultOpen: PropTypes.arrayOf(PropTypes.number),
  allowMultiple: PropTypes.bool,
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  borderColor: PropTypes.string,
  iconColor: PropTypes.string,
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string,
};

export default Accordion; 