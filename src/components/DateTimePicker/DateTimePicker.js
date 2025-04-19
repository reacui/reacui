import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// Helper functions for date operations
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

const createDaysForCurrentMonth = (year, month) => {
  return [...Array(getDaysInMonth(year, month))].map((_, index) => {
    return {
      date: new Date(year, month, index + 1),
      dayOfMonth: index + 1,
      isCurrentMonth: true
    };
  });
};

const createDaysForPrevMonth = (year, month) => {
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
  
  return [...Array(firstDayOfMonth)].map((_, index) => {
    return {
      date: new Date(prevYear, prevMonth, daysInPrevMonth - index),
      dayOfMonth: daysInPrevMonth - index,
      isCurrentMonth: false
    };
  }).reverse();
};

const createDaysForNextMonth = (year, month, currentMonthDays, prevMonthDays) => {
  const totalDays = currentMonthDays.length + prevMonthDays.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  const daysToAdd = 42 - totalDays;
  
  return [...Array(daysToAdd)].map((_, index) => {
    return {
      date: new Date(nextYear, nextMonth, index + 1),
      dayOfMonth: index + 1,
      isCurrentMonth: false
    };
  });
};

const createCalendarDays = (year, month) => {
  const currentMonthDays = createDaysForCurrentMonth(year, month);
  const prevMonthDays = createDaysForPrevMonth(year, month);
  const nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays, prevMonthDays);
  
  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
};

const formatTime = (hours, minutes) => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const parseTime = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return { hours, minutes };
};

const DateTimePicker = ({
  value = new Date(),
  onChange,
  minDate,
  maxDate,
  format = 'yyyy-MM-dd HH:mm',
  showTimeSelect = true,
  timeFormat = '24h',
  disabled = false,
  placeholder = 'Select date and time',
  className = '',
  inputClassName = '',
  calendarClassName = '',
  timeClassName = '',
  clearable = true,
  closeOnSelect = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value instanceof Date ? value : new Date());
  const [selectedDate, setSelectedDate] = useState(value instanceof Date ? value : null);
  const [calendarDays, setCalendarDays] = useState([]);
  const [currentView, setCurrentView] = useState('date'); // 'date', 'month', 'year', 'time'
  const [inputValue, setInputValue] = useState('');
  
  const pickerRef = useRef(null);
  const inputRef = useRef(null);

  // Update calendar when current date changes
  useEffect(() => {
    setCalendarDays(createCalendarDays(currentDate.getFullYear(), currentDate.getMonth()));
  }, [currentDate]);

  // Format the date for display in the input
  useEffect(() => {
    if (selectedDate) {
      let formattedDate = format.replace('yyyy', selectedDate.getFullYear());
      formattedDate = formattedDate.replace('MM', (selectedDate.getMonth() + 1).toString().padStart(2, '0'));
      formattedDate = formattedDate.replace('dd', selectedDate.getDate().toString().padStart(2, '0'));
      
      if (format.includes('HH') || format.includes('hh')) {
        const hours = timeFormat === '12h' && format.includes('hh') ? 
          (selectedDate.getHours() % 12 || 12) : 
          selectedDate.getHours();
        
        formattedDate = formattedDate.replace('HH', hours.toString().padStart(2, '0'));
        formattedDate = formattedDate.replace('hh', hours.toString().padStart(2, '0'));
      }
      
      if (format.includes('mm')) {
        formattedDate = formattedDate.replace('mm', selectedDate.getMinutes().toString().padStart(2, '0'));
      }
      
      if (format.includes('a')) {
        const period = selectedDate.getHours() >= 12 ? 'PM' : 'AM';
        formattedDate = formattedDate.replace('a', period);
      }
      
      setInputValue(formattedDate);
    } else {
      setInputValue('');
    }
  }, [selectedDate, format, timeFormat]);

  // Handle clicking outside to close the picker
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const prevMonth = prev.getMonth() === 0 ? 11 : prev.getMonth() - 1;
      const prevYear = prev.getMonth() === 0 ? prev.getFullYear() - 1 : prev.getFullYear();
      return new Date(prevYear, prevMonth, 1);
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const nextMonth = prev.getMonth() === 11 ? 0 : prev.getMonth() + 1;
      const nextYear = prev.getMonth() === 11 ? prev.getFullYear() + 1 : prev.getFullYear();
      return new Date(nextYear, nextMonth, 1);
    });
  };

  // Handle date selection
  const handleDateSelect = (day) => {
    let newDate;
    
    if (selectedDate) {
      // Keep the time from the previously selected date
      newDate = new Date(
        day.date.getFullYear(),
        day.date.getMonth(),
        day.date.getDate(),
        selectedDate.getHours(),
        selectedDate.getMinutes()
      );
    } else {
      newDate = new Date(day.date);
    }
    
    setSelectedDate(newDate);
    
    if (onChange) {
      onChange(newDate);
    }
    
    if (closeOnSelect && !showTimeSelect) {
      setIsOpen(false);
    } else if (showTimeSelect) {
      setCurrentView('time');
    }
  };

  // Handle time selection
  const handleTimeChange = (e) => {
    const timeString = e.target.value;
    const { hours, minutes } = parseTime(timeString);
    
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      
      setSelectedDate(newDate);
      
      if (onChange) {
        onChange(newDate);
      }
      
      if (closeOnSelect) {
        setIsOpen(false);
      }
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
    // Try to parse the date from the input value
    const dateMatch = e.target.value.match(/(\d{4})-(\d{2})-(\d{2})/);
    const timeMatch = e.target.value.match(/(\d{2}):(\d{2})/);
    
    if (dateMatch) {
      const year = parseInt(dateMatch[1]);
      const month = parseInt(dateMatch[2]) - 1;
      const day = parseInt(dateMatch[3]);
      
      let hours = 0;
      let minutes = 0;
      
      if (timeMatch) {
        hours = parseInt(timeMatch[1]);
        minutes = parseInt(timeMatch[2]);
      }
      
      const newDate = new Date(year, month, day, hours, minutes);
      
      if (!isNaN(newDate.getTime())) {
        setSelectedDate(newDate);
        setCurrentDate(new Date(year, month, 1));
        
        if (onChange) {
          onChange(newDate);
        }
      }
    }
  };

  // Handle toggling the picker
  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      
      if (!isOpen) {
        // Reset view to date if reopening
        setCurrentView('date');
      }
    }
  };

  // Handle clearing the selection
  const handleClear = (e) => {
    e.stopPropagation();
    setSelectedDate(null);
    setInputValue('');
    
    if (onChange) {
      onChange(null);
    }
  };

  // Generate time options
  const generateTimeOptions = () => {
    const options = [];
    const interval = 15; // minutes interval
    
    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes += interval) {
        let displayHours = hours;
        let period = '';
        
        if (timeFormat === '12h') {
          period = hours >= 12 ? ' PM' : ' AM';
          displayHours = hours % 12 || 12;
        }
        
        const time = `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}${period}`;
        const value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        
        options.push(
          <option key={value} value={value}>
            {time}
          </option>
        );
      }
    }
    
    return options;
  };

  // Generate the month name
  const getMonthName = (month) => {
    return new Date(0, month).toLocaleString('default', { month: 'long' });
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  // Check if a date is selected
  const isSelected = (date) => {
    if (!selectedDate) return false;
    
    return date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  // Check if a date is disabled
  const isDisabled = (date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  // Render the calendar header
  const renderCalendarHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button
        type="button"
        className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
        onClick={handlePrevMonth}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="font-semibold">
        {getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}
      </div>
      <button
        type="button"
        className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
        onClick={handleNextMonth}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );

  // Render weekday headers
  const renderWeekdays = () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
    );
  };

  // Render calendar days
  const renderCalendarDays = () => (
    <div className="grid grid-cols-7 gap-1">
      {calendarDays.map((day, index) => (
        <button
          key={index}
          type="button"
          className={`
            py-2 rounded-full text-sm focus:outline-none
            ${!day.isCurrentMonth ? 'text-gray-400' : ''}
            ${isToday(day.date) ? 'bg-gray-100' : ''}
            ${isSelected(day.date) ? 'bg-primary-600 text-white hover:bg-primary-700' : 'hover:bg-gray-100'}
            ${isDisabled(day.date) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          onClick={() => !isDisabled(day.date) && handleDateSelect(day)}
          disabled={isDisabled(day.date)}
        >
          {day.dayOfMonth}
        </button>
      ))}
    </div>
  );

  // Render time selector
  const renderTimeSelector = () => (
    <div className={`mt-4 ${timeClassName}`}>
      <select
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
        value={selectedDate ? formatTime(selectedDate.getHours(), selectedDate.getMinutes()) : ''}
        onChange={handleTimeChange}
      >
        <option value="" disabled>Select time</option>
        {generateTimeOptions()}
      </select>
    </div>
  );

  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className={`w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 ${inputClassName}`}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          readOnly={disabled}
          disabled={disabled}
        />
        {selectedDate && clearable && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={handleClear}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {isOpen && (
        <div className={`absolute mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-4 w-64 ${calendarClassName}`}>
          {currentView === 'date' && (
            <>
              {renderCalendarHeader()}
              {renderWeekdays()}
              {renderCalendarDays()}
              {showTimeSelect && selectedDate && renderTimeSelector()}
            </>
          )}
          
          {currentView === 'time' && showTimeSelect && selectedDate && (
            <>
              <div className="flex justify-between items-center mb-4">
                <button
                  type="button"
                  className="text-sm text-primary-600 hover:text-primary-700 focus:outline-none"
                  onClick={() => setCurrentView('date')}
                >
                  Back to Calendar
                </button>
                <div className="font-semibold">
                  {selectedDate.toLocaleDateString()}
                </div>
              </div>
              {renderTimeSelector()}
            </>
          )}
        </div>
      )}
    </div>
  );
};

DateTimePicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  format: PropTypes.string,
  showTimeSelect: PropTypes.bool,
  timeFormat: PropTypes.oneOf(['12h', '24h']),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  calendarClassName: PropTypes.string,
  timeClassName: PropTypes.string,
  clearable: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
};

export default DateTimePicker; 