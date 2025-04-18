import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Slider from './Slider';

describe('Slider component', () => {
  test('renders slider with default props', () => {
    render(<Slider />);
    const sliderInput = screen.getByRole('slider');
    expect(sliderInput).toBeInTheDocument();
    expect(sliderInput).toHaveValue('0');
  });

  test('renders with custom min, max, and value', () => {
    render(<Slider min={10} max={200} value={50} />);
    const sliderInput = screen.getByRole('slider');
    
    expect(sliderInput).toHaveAttribute('min', '10');
    expect(sliderInput).toHaveAttribute('max', '200');
    expect(sliderInput).toHaveValue('50');
  });

  test('renders with label', () => {
    render(<Slider label="Volume" />);
    const label = screen.getByText('Volume');
    expect(label).toBeInTheDocument();
  });

  test('renders with value display when showValue is true', () => {
    render(<Slider value={42} showValue />);
    const valueDisplay = screen.getByText('42');
    expect(valueDisplay).toBeInTheDocument();
  });

  test('applies disabled state', () => {
    render(<Slider disabled />);
    const sliderInput = screen.getByRole('slider');
    expect(sliderInput).toBeDisabled();
    expect(sliderInput).toHaveClass('opacity-50');
  });

  test('calls onChange when value changes', () => {
    const handleChange = jest.fn();
    render(<Slider onChange={handleChange} />);
    const sliderInput = screen.getByRole('slider');
    
    fireEvent.change(sliderInput, { target: { value: 42 } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('does not call onChange when disabled', () => {
    const handleChange = jest.fn();
    render(<Slider disabled onChange={handleChange} />);
    const sliderInput = screen.getByRole('slider');
    
    fireEvent.change(sliderInput, { target: { value: 42 } });
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('applies custom className', () => {
    render(<Slider className="custom-class" />);
    const container = screen.getByRole('slider').closest('div.w-full');
    expect(container).toHaveClass('custom-class');
  });

  test('shows min and max labels', () => {
    render(<Slider min={10} max={200} />);
    const minLabel = screen.getByText('10');
    const maxLabel = screen.getByText('200');
    
    expect(minLabel).toBeInTheDocument();
    expect(maxLabel).toBeInTheDocument();
  });
}); 