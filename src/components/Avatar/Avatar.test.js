import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Avatar from './Avatar';

describe('Avatar Component', () => {
  test('renders with image source', () => {
    render(<Avatar src="test-image.jpg" alt="Test User" />);
    const image = screen.getByAltText('Test User');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
  });

  test('renders initials when no image source is provided', () => {
    render(<Avatar alt="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  test('renders custom initials when provided', () => {
    render(<Avatar alt="John Doe" initials="ABC" />);
    expect(screen.getByText('ABC')).toBeInTheDocument();
  });

  test('uses alt text to generate initials if not provided', () => {
    render(<Avatar alt="Jane Smith" />);
    expect(screen.getByText('JS')).toBeInTheDocument();
  });

  test('falls back to initials when image fails to load', () => {
    render(<Avatar src="invalid-image.jpg" alt="Error User" />);
    const image = screen.getByAltText('Error User');
    fireEvent.error(image);
    expect(screen.getByText('EU')).toBeInTheDocument();
  });

  test('applies different size classes', () => {
    const { rerender } = render(<Avatar alt="Size Test" size="xs" />);
    const initialAvatar = screen.getByText('ST');
    expect(initialAvatar).toHaveClass('w-6 h-6');

    rerender(<Avatar alt="Size Test" size="lg" />);
    const largerAvatar = screen.getByText('ST');
    expect(largerAvatar).toHaveClass('w-12 h-12');
  });

  test('applies different shape classes', () => {
    const { rerender } = render(<Avatar alt="Shape Test" shape="circle" />);
    const circleAvatar = screen.getByText('ST');
    expect(circleAvatar).toHaveClass('rounded-full');

    rerender(<Avatar alt="Shape Test" shape="square" />);
    const squareAvatar = screen.getByText('ST');
    expect(squareAvatar).toHaveClass('rounded-md');

    rerender(<Avatar alt="Shape Test" shape="rounded" />);
    const roundedAvatar = screen.getByText('ST');
    expect(roundedAvatar).toHaveClass('rounded-lg');
  });

  test('applies border when specified', () => {
    render(<Avatar alt="Border Test" border={true} />);
    const avatar = screen.getByText('BT');
    expect(avatar).toHaveClass('border-2');
  });

  test('renders status indicator when status is true', () => {
    render(<Avatar alt="Status Test" status={true} />);
    const statusIndicator = document.querySelector('.absolute.bottom-0.right-0');
    expect(statusIndicator).toBeInTheDocument();
  });

  test('applies custom colors', () => {
    render(
      <Avatar 
        alt="Color Test" 
        bgColor="bg-red-500" 
        textColor="text-yellow-100" 
        statusColor="bg-blue-600"
        status={true}
      />
    );
    const colorAvatar = screen.getByText('CT');
    expect(colorAvatar).toHaveClass('bg-red-500');
    expect(colorAvatar).toHaveClass('text-yellow-100');
    const statusIndicator = document.querySelector('.absolute.bottom-0.right-0');
    expect(statusIndicator).toHaveClass('bg-blue-600');
  });
}); 