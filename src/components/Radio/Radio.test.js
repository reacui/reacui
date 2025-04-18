import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Radio from './Radio';

describe('Radio component', () => {
  test('renders radio with default props', () => {
    render(<Radio value="test" name="test-group" />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeInTheDocument();
    expect(radio).toHaveAttribute('type', 'radio');
    expect(radio).toHaveAttribute('value', 'test');
    expect(radio).toHaveAttribute('name', 'test-group');
    expect(radio).not.toBeChecked();
  });

  test('renders radio with label', () => {
    render(<Radio value="test" name="test-group" label="Test Label" />);
    const radio = screen.getByRole('radio');
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(radio).toHaveAttribute('id', 'test');
  });

  test('renders radio as checked', () => {
    render(<Radio value="test" name="test-group" checked />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeChecked();
  });

  test('applies disabled attribute when provided', () => {
    render(<Radio value="test" name="test-group" disabled />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeDisabled();
    expect(radio).toHaveClass('opacity-50');
  });

  test('calls onChange when radio is clicked', () => {
    const handleChange = jest.fn();
    render(<Radio value="test" name="test-group" onChange={handleChange} />);
    fireEvent.click(screen.getByRole('radio'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('does not call onChange when disabled radio is clicked', () => {
    const handleChange = jest.fn();
    render(<Radio value="test" name="test-group" disabled onChange={handleChange} />);
    fireEvent.click(screen.getByRole('radio'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('radio group allows only one selection', () => {
    // Create a test component with state to handle the radio group
    const RadioGroup = () => {
      const [selectedValue, setSelectedValue] = useState('');
      
      const handleChange = (e) => {
        setSelectedValue(e.target.value);
      };
      
      return (
        <>
          <Radio 
            value="option1" 
            name="group" 
            label="Option 1" 
            checked={selectedValue === 'option1'} 
            onChange={handleChange} 
          />
          <Radio 
            value="option2" 
            name="group" 
            label="Option 2" 
            checked={selectedValue === 'option2'} 
            onChange={handleChange} 
          />
          <Radio 
            value="option3" 
            name="group" 
            label="Option 3" 
            checked={selectedValue === 'option3'} 
            onChange={handleChange} 
          />
        </>
      );
    };
    
    render(<RadioGroup />);
    
    const option1 = screen.getByLabelText('Option 1');
    const option2 = screen.getByLabelText('Option 2');
    const option3 = screen.getByLabelText('Option 3');
    
    // Initially none are checked
    expect(option1).not.toBeChecked();
    expect(option2).not.toBeChecked();
    expect(option3).not.toBeChecked();
    
    // Click option 1
    fireEvent.click(option1);
    expect(option1).toBeChecked();
    expect(option2).not.toBeChecked();
    expect(option3).not.toBeChecked();
    
    // Click option 2
    fireEvent.click(option2);
    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
    expect(option3).not.toBeChecked();
  });
}); 