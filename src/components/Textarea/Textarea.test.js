import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Textarea from './index';

describe('Textarea', () => {
  test('renders with default props', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders with custom props', () => {
    render(
      <Textarea
        name="description"
        placeholder="Enter description"
        value="Initial value"
        onChange={() => {}}
        rows={5}
        cols={40}
        maxLength={200}
        minLength={10}
        required
        className="custom-textarea"
        data-testid="test-textarea"
      />
    );
    
    const textarea = screen.getByTestId('test-textarea');
    expect(textarea).toHaveAttribute('name', 'description');
    expect(textarea).toHaveAttribute('placeholder', 'Enter description');
    expect(textarea).toHaveValue('Initial value');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('cols', '40');
    expect(textarea).toHaveAttribute('maxLength', '200');
    expect(textarea).toHaveAttribute('minLength', '10');
    expect(textarea).toHaveAttribute('required');
    expect(textarea).toHaveClass('custom-textarea');
  });

  test('handles onChange event', () => {
    const handleChange = jest.fn();
    render(<Textarea onChange={handleChange} data-testid="test-textarea" />);
    
    const textarea = screen.getByTestId('test-textarea');
    fireEvent.change(textarea, { target: { value: 'New text' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('should not call onChange when disabled', () => {
    const handleChange = jest.fn();
    render(<Textarea onChange={handleChange} disabled data-testid="test-textarea" />);
    
    const textarea = screen.getByTestId('test-textarea');
    expect(textarea).toBeDisabled();
    
    fireEvent.change(textarea, { target: { value: 'New text' } });
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    render(
      <Textarea 
        onFocus={handleFocus} 
        onBlur={handleBlur} 
        data-testid="test-textarea" 
      />
    );
    
    const textarea = screen.getByTestId('test-textarea');
    fireEvent.focus(textarea);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(textarea);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
}); 