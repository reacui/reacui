import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Toast from './Toast';

// Mock timers
jest.useFakeTimers();

describe('Toast component', () => {
  test('renders toast with message', () => {
    render(<Toast message="Notification message" />);
    const toast = screen.getByRole('alert');
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveTextContent('Notification message');
  });

  test('renders toast with description', () => {
    render(<Toast message="Notification message" description="Additional details here" />);
    expect(screen.getByText('Notification message')).toBeInTheDocument();
    expect(screen.getByText('Additional details here')).toBeInTheDocument();
  });

  test('renders toast with info variant by default', () => {
    render(<Toast message="Info notification" />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-blue-50');
    expect(toast).toHaveClass('text-blue-800');
  });

  test('renders toast with success variant', () => {
    render(<Toast message="Success notification" variant="success" />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-green-50');
    expect(toast).toHaveClass('text-green-800');
  });

  test('renders toast with warning variant', () => {
    render(<Toast message="Warning notification" variant="warning" />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-yellow-50');
    expect(toast).toHaveClass('text-yellow-800');
  });

  test('renders toast with danger variant', () => {
    render(<Toast message="Danger notification" variant="danger" />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('bg-red-50');
    expect(toast).toHaveClass('text-red-800');
  });

  test('renders toast with correct position', () => {
    render(<Toast message="Top right position" position="top-right" />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('fixed');
    expect(toast).toHaveClass('top-5');
    expect(toast).toHaveClass('right-5');
  });

  test('renders toast with different position', () => {
    render(<Toast message="Bottom left position" position="bottom-left" />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('fixed');
    expect(toast).toHaveClass('bottom-5');
    expect(toast).toHaveClass('left-5');
  });

  test('renders toast with close button when dismissible', () => {
    render(<Toast message="Dismissible notification" dismissible={true} />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  test('does not render close button when not dismissible', () => {
    render(<Toast message="Non-dismissible notification" dismissible={false} />);
    const closeButton = screen.queryByRole('button', { name: /close/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  test('auto-dismisses after duration', async () => {
    const onDismiss = jest.fn();
    render(<Toast message="Auto-dismiss notification" duration={3000} onDismiss={onDismiss} />);
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(3300); // duration + animation duration
    });

    // Toast should be removed from the DOM
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  test('calls onDismiss when close button is clicked', () => {
    const onDismiss = jest.fn();
    render(<Toast message="Dismissible notification" dismissible={true} onDismiss={onDismiss} />);
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    // Fast-forward time past the animation duration
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  test('renders toast with custom icon', () => {
    const customIcon = <span data-testid="custom-icon">🔔</span>;
    render(<Toast message="Custom icon notification" icon={customIcon} />);
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  test('renders toast with action button', () => {
    const action = (
      <button data-testid="action-button">Undo</button>
    );
    render(<Toast message="Action notification" action={action} />);
    
    expect(screen.getByTestId('action-button')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Toast message="Custom class notification" className="custom-class" />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('custom-class');
  });
}); 