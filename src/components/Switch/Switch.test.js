import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Switch from './Switch';

describe('Switch component', () => {
  test('renders switch with default props', () => {
    render(<Switch />);
    const switchInput = screen.getByRole('checkbox');
    expect(switchInput).toBeInTheDocument();
    expect(switchInput).not.toBeChecked();
  });

  test('renders switch with label on right side by default', () => {
    render(<Switch label="Dark Mode" />);
    const switchInput = screen.getByRole('checkbox');
    const label = screen.getByText('Dark Mode');
    expect(label).toBeInTheDocument();
    const container = switchInput.closest('div.inline-flex');
    expect(container).toContainElement(label);
    expect(label.previousSibling).not.toBeNull();
  });

  test('renders switch with label on left side', () => {
    render(<Switch label="Dark Mode" labelPosition="left" />);
    const switchInput = screen.getByRole('checkbox');
    const label = screen.getByText('Dark Mode');
    expect(label).toBeInTheDocument();
    const container = switchInput.closest('div.inline-flex');
    expect(container).toContainElement(label);
    expect(label.nextSibling).not.toBeNull();
  });

  test('renders switch as checked', () => {
    render(<Switch checked />);
    const switchInput = screen.getByRole('checkbox');
    expect(switchInput).toBeChecked();
  });

  test('applies disabled attribute when provided', () => {
    render(<Switch disabled />);
    const switchInput = screen.getByRole('checkbox');
    expect(switchInput).toBeDisabled();
    expect(switchInput.nextSibling).toHaveClass('opacity-50');
  });

  test('calls onChange when switch is clicked', () => {
    const handleChange = jest.fn();
    render(<Switch onChange={handleChange} />);
    const switchTrack = screen.getByRole('checkbox').nextSibling;
    fireEvent.click(switchTrack);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('does not call onChange when disabled switch is clicked', () => {
    const handleChange = jest.fn();
    render(<Switch disabled onChange={handleChange} />);
    const switchTrack = screen.getByRole('checkbox').nextSibling;
    fireEvent.click(switchTrack);
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('applies custom color class when checked', () => {
    render(<Switch checked color="green" />);
    const switchTrack = screen.getByRole('checkbox').nextSibling;
    expect(switchTrack).toHaveClass('bg-green-600');
  });

  test('applies gray color class when unchecked', () => {
    render(<Switch color="green" />);
    const switchTrack = screen.getByRole('checkbox').nextSibling;
    expect(switchTrack).toHaveClass('bg-gray-300');
  });

  test('applies custom className', () => {
    render(<Switch className="custom-class" />);
    const switchContainer = screen.getByRole('checkbox').parentElement.parentElement;
    expect(switchContainer).toHaveClass('custom-class');
  });

  test('uses provided id', () => {
    render(<Switch id="custom-id" />);
    const switchInput = screen.getByRole('checkbox');
    expect(switchInput).toHaveAttribute('id', 'custom-id');
  });

  test('generates random id if not provided', () => {
    render(<Switch />);
    const switchInput = screen.getByRole('checkbox');
    expect(switchInput.id).toMatch(/^switch-[a-z0-9]{7}$/);
  });
}); 