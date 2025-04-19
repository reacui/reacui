import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner component', () => {
  test('renders spinner with default props', () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('svg');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
    expect(spinner).toHaveClass('h-6');
    expect(spinner).toHaveClass('w-6');
    expect(spinner).toHaveClass('text-primary-600');
  });

  test('renders spinner with small size', () => {
    const { container } = render(<Spinner size="sm" />);
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('h-4');
    expect(spinner).toHaveClass('w-4');
  });

  test('renders spinner with medium size', () => {
    const { container } = render(<Spinner size="md" />);
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('h-6');
    expect(spinner).toHaveClass('w-6');
  });

  test('renders spinner with large size', () => {
    const { container } = render(<Spinner size="lg" />);
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('h-8');
    expect(spinner).toHaveClass('w-8');
  });

  test('renders spinner with extra large size', () => {
    const { container } = render(<Spinner size="xl" />);
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('h-12');
    expect(spinner).toHaveClass('w-12');
  });

  test('renders spinner with primary color', () => {
    const { container } = render(<Spinner color="primary" />);
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('text-primary-600');
  });

  test('renders spinner with secondary color', () => {
    const { container } = render(<Spinner color="secondary" />);
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('text-secondary-600');
  });

  test('renders spinner with white color', () => {
    const { container } = render(<Spinner color="white" />);
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('text-white');
  });

  test('renders spinner with gray color', () => {
    const { container } = render(<Spinner color="gray" />);
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('text-gray-600');
  });

  test('applies custom className', () => {
    const { container } = render(<Spinner className="custom-class" />);
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('custom-class');
  });
}); 