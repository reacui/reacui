import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Alert from './Alert';

describe('Alert component', () => {
  test('renders alert with default props', () => {
    render(<Alert>This is an alert</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('bg-blue-50');
    expect(alert).toHaveTextContent('This is an alert');
  });

  test('renders alert with info variant', () => {
    render(<Alert variant="info">Info Alert</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-blue-50');
    expect(alert).toHaveClass('text-blue-800');
  });

  test('renders alert with success variant', () => {
    render(<Alert variant="success">Success Alert</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-green-50');
    expect(alert).toHaveClass('text-green-800');
  });

  test('renders alert with warning variant', () => {
    render(<Alert variant="warning">Warning Alert</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-yellow-50');
    expect(alert).toHaveClass('text-yellow-800');
  });

  test('renders alert with danger variant', () => {
    render(<Alert variant="danger">Danger Alert</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-red-50');
    expect(alert).toHaveClass('text-red-800');
  });

  test('renders with default icon', () => {
    render(<Alert>Alert with icon</Alert>);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('renders with custom icon', () => {
    const customIcon = <span data-testid="custom-icon">🔔</span>;
    render(<Alert icon={customIcon}>Alert with custom icon</Alert>);
    const icon = screen.getByTestId('custom-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent('🔔');
  });

  test('renders without icon when icon is set to null', () => {
    render(<Alert icon={null}>Alert without icon</Alert>);
    const svg = document.querySelector('svg');
    expect(svg).not.toBeInTheDocument();
  });

  test('renders with dismiss button when dismissible is true', () => {
    render(<Alert dismissible>Dismissible Alert</Alert>);
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  test('does not render dismiss button when dismissible is false', () => {
    render(<Alert>Non-dismissible Alert</Alert>);
    const closeButton = screen.queryByRole('button', { name: /close/i });
    expect(closeButton).not.toBeInTheDocument();
  });

  test('calls onDismiss when dismiss button is clicked', () => {
    const onDismiss = jest.fn();
    render(<Alert dismissible onDismiss={onDismiss}>Dismissible Alert</Alert>);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  test('removes alert from DOM when dismissed', () => {
    render(<Alert dismissible>Dismissible Alert</Alert>);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    const alert = screen.queryByRole('alert');
    expect(alert).not.toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Alert className="custom-class">Alert with custom class</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('custom-class');
  });
}); 