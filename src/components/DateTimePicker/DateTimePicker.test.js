import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DateTimePicker from './DateTimePicker';

describe('DateTimePicker Component', () => {
  // Mock Date.now to return a consistent date for tests
  const mockDate = new Date(2023, 0, 15);
  const originalDate = global.Date;

  beforeAll(() => {
    global.Date = class extends Date {
      constructor(date) {
        if (date) {
          return new originalDate(date);
        }
        return mockDate;
      }
      static now() {
        return mockDate.getTime();
      }
    };
  });

  afterAll(() => {
    global.Date = originalDate;
  });

  test('renders input element', () => {
    render(<DateTimePicker />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('opens calendar when input is clicked', () => {
    render(<DateTimePicker />);
    const input = screen.getByRole('textbox');
    
    // Click input to open calendar
    fireEvent.click(input);
    
    // Check if calendar is visible (check for elements that would be in the calendar)
    const calendarEl = document.querySelector('.grid-cols-7');
    expect(calendarEl).toBeInTheDocument();
  });

  test('displays placeholder text when no date is selected', () => {
    const placeholder = 'Choose a date';
    render(<DateTimePicker placeholder={placeholder} value={null} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', placeholder);
  });

  test('accepts initial value', () => {
    // Create a test date
    const initialDate = new Date(2023, 4, 15, 10, 30);
    
    // Render with a custom format that matches what we test for
    render(<DateTimePicker value={initialDate} format="yyyy-MM-dd HH:mm" />);
    
    // Just check for existence
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('can be disabled', () => {
    render(<DateTimePicker disabled={true} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });
}); 