import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RangeSlider from './RangeSlider';

// Mock the getBoundingClientRect method
const mockGetBoundingClientRect = () => {
  return {
    width: 200,
    height: 10,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
  };
};

describe('RangeSlider component', () => {
  beforeEach(() => {
    // Mock the window's event listeners
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders range slider with default props', () => {
    render(<RangeSlider />);
    const lowerInput = screen.getByLabelText('Lower bound');
    const upperInput = screen.getByLabelText('Upper bound');
    
    expect(lowerInput).toBeInTheDocument();
    expect(upperInput).toBeInTheDocument();
    expect(lowerInput).toHaveValue('25');
    expect(upperInput).toHaveValue('75');
  });

  test('renders with custom min, max, and values', () => {
    render(<RangeSlider min={10} max={200} values={[50, 150]} />);
    const lowerInput = screen.getByLabelText('Lower bound');
    const upperInput = screen.getByLabelText('Upper bound');
    
    expect(lowerInput).toHaveAttribute('min', '10');
    expect(lowerInput).toHaveAttribute('max', '200');
    expect(lowerInput).toHaveValue('50');
    expect(upperInput).toHaveValue('150');
  });

  test('renders with label', () => {
    render(<RangeSlider label="Price Range" />);
    const label = screen.getByText('Price Range');
    expect(label).toBeInTheDocument();
  });

  test('renders with values display when showValues is true', () => {
    render(<RangeSlider values={[30, 70]} showValues />);
    const valuesDisplay = screen.getByText('30 - 70');
    expect(valuesDisplay).toBeInTheDocument();
  });

  test('applies disabled state', () => {
    render(<RangeSlider disabled />);
    const lowerInput = screen.getByLabelText('Lower bound');
    const upperInput = screen.getByLabelText('Upper bound');
    
    expect(lowerInput).toBeDisabled();
    expect(upperInput).toBeDisabled();
    
    // Check for disabled styling on the track
    const track = screen.getByLabelText('Lower bound').parentElement.querySelector('div:nth-child(2)');
    expect(track).toHaveClass('bg-gray-400');
  });

  test('calls onChange when lower input value changes', () => {
    const handleChange = jest.fn();
    render(<RangeSlider onChange={handleChange} />);
    const lowerInput = screen.getByLabelText('Lower bound');
    
    fireEvent.change(lowerInput, { target: { value: 40 } });
    expect(handleChange).toHaveBeenCalledWith([40, 75]);
  });

  test('calls onChange when upper input value changes', () => {
    const handleChange = jest.fn();
    render(<RangeSlider onChange={handleChange} />);
    const upperInput = screen.getByLabelText('Upper bound');
    
    fireEvent.change(upperInput, { target: { value: 60 } });
    expect(handleChange).toHaveBeenCalledWith([25, 60]);
  });

  test('prevents lower value from exceeding upper value', () => {
    const handleChange = jest.fn();
    render(<RangeSlider values={[30, 50]} onChange={handleChange} />);
    const lowerInput = screen.getByLabelText('Lower bound');
    
    fireEvent.change(lowerInput, { target: { value: 60 } });
    expect(handleChange).toHaveBeenCalledWith([49, 50]);
  });

  test('prevents upper value from going below lower value', () => {
    const handleChange = jest.fn();
    render(<RangeSlider values={[30, 50]} onChange={handleChange} />);
    const upperInput = screen.getByLabelText('Upper bound');
    
    fireEvent.change(upperInput, { target: { value: 20 } });
    expect(handleChange).toHaveBeenCalledWith([30, 31]);
  });

  test('applies custom color class', () => {
    render(<RangeSlider color="green" />);
    const coloredTrack = screen.getByLabelText('Lower bound').parentElement.querySelector('div:nth-child(2)');
    const lowerThumb = screen.getByLabelText('Lower bound').parentElement.querySelector('div:nth-child(5)');
    
    expect(coloredTrack).toHaveClass('bg-green-600');
    expect(lowerThumb).toHaveClass('border-green-600');
  });

  test('does not call onChange when disabled', () => {
    const handleChange = jest.fn();
    render(<RangeSlider disabled onChange={handleChange} />);
    const lowerInput = screen.getByLabelText('Lower bound');
    const upperInput = screen.getByLabelText('Upper bound');
    
    fireEvent.change(lowerInput, { target: { value: 40 } });
    fireEvent.change(upperInput, { target: { value: 60 } });
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('applies custom className', () => {
    render(<RangeSlider className="custom-class" />);
    const container = screen.getByLabelText('Lower bound').closest('div');
    expect(container).toHaveClass('custom-class');
  });

  test('shows min and max labels', () => {
    render(<RangeSlider min={10} max={200} />);
    const minLabel = screen.getByText('10');
    const maxLabel = screen.getByText('200');
    
    expect(minLabel).toBeInTheDocument();
    expect(maxLabel).toBeInTheDocument();
  });

  test('handles thumb mouse events', () => {
    // Setup
    const handleChange = jest.fn();
    Element.prototype.getBoundingClientRect = jest.fn().mockImplementation(mockGetBoundingClientRect);
    
    const { container } = render(<RangeSlider onChange={handleChange} />);
    
    // Get thumb elements
    const lowerThumb = container.querySelector('div[style*="zIndex: 5"]');
    const upperThumb = container.querySelector('div[style*="zIndex: 6"]');
    
    expect(lowerThumb).not.toBeNull();
    expect(upperThumb).not.toBeNull();
    
    // Mock document event listeners
    const originalAddEventListener = document.addEventListener;
    const originalRemoveEventListener = document.removeEventListener;
    
    document.addEventListener = jest.fn();
    document.removeEventListener = jest.fn();
    
    // Simulate mouse down on lower thumb
    fireEvent.mouseDown(lowerThumb);
    
    // Check if event listeners were added
    expect(document.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(document.addEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function));
    
    // Cleanup
    document.addEventListener = originalAddEventListener;
    document.removeEventListener = originalRemoveEventListener;
  });
}); 