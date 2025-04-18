import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from './Select';

describe('Select component', () => {
  const mockOptions = [
    { value: 'us', label: 'USA' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' }
  ];

  test('renders select with default props', () => {
    render(<Select />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('');
  });

  test('renders select with placeholder', () => {
    render(<Select placeholder="Select country" />);
    const placeholder = screen.getByText('Select country');
    expect(placeholder).toBeInTheDocument();
  });

  test('renders select with options', () => {
    render(<Select options={mockOptions} />);
    
    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test('renders select with preselected value', () => {
    render(<Select options={mockOptions} value="ca" />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('ca');
  });

  test('applies disabled attribute when provided', () => {
    render(<Select options={mockOptions} disabled />);
    
    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
    expect(select).toHaveClass('opacity-50');
    expect(select).toHaveClass('cursor-not-allowed');
  });

  test('calls onChange when an option is selected', () => {
    const handleChange = jest.fn();
    render(<Select options={mockOptions} onChange={handleChange} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'ca' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('does not call onChange when disabled select is changed', () => {
    const handleChange = jest.fn();
    render(<Select options={mockOptions} disabled onChange={handleChange} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'ca' } });
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('renders multiple select', () => {
    render(<Select options={mockOptions} multiple />);
    
    const select = screen.getByRole('listbox');
    expect(select).toHaveAttribute('multiple');
  });

  test('handles multiple selection', () => {
    const handleChange = jest.fn();
    render(<Select options={mockOptions} multiple onChange={handleChange} />);
    
    const select = screen.getByRole('listbox');
    
    // Mock the selectedOptions property
    Object.defineProperty(select, 'selectedOptions', {
      writable: true,
      value: [
        { value: 'us' },
        { value: 'ca' }
      ]
    });
    
    fireEvent.change(select);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
}); 