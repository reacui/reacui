import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tooltip from './index';

// Mock the requestAnimationFrame for positioning calculations
global.requestAnimationFrame = (cb) => cb();

// Mock element.getBoundingClientRect() for positioning tests
Element.prototype.getBoundingClientRect = jest.fn(() => ({
  width: 100,
  height: 40,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
}));

describe('Tooltip Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders the trigger element', () => {
    render(
      <Tooltip content="Tooltip Text">
        <button>Hover Me</button>
      </Tooltip>
    );
    
    expect(screen.getByText('Hover Me')).toBeInTheDocument();
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();
  });

  test('shows tooltip on hover after delay', () => {
    render(
      <Tooltip content="Tooltip Text" delay={200}>
        <button>Hover Me</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByText('Hover Me'));
    
    // Tooltip should not be visible before delay
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();
    
    // Advance timers to just before delay completes
    act(() => {
      jest.advanceTimersByTime(199);
    });
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();
    
    // Advance timers to complete delay
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.getByText('Tooltip Text')).toBeInTheDocument();
  });

  test('hides tooltip on mouse leave', () => {
    render(
      <Tooltip content="Tooltip Text" delay={0}>
        <button>Hover Me</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByText('Hover Me'));
    
    // Advance timers to show tooltip
    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(screen.getByText('Tooltip Text')).toBeInTheDocument();
    
    // Now move mouse away
    fireEvent.mouseLeave(screen.getByText('Hover Me'));
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();
  });

  test('cancels tooltip display when mouse leaves before delay completes', () => {
    render(
      <Tooltip content="Tooltip Text" delay={200}>
        <button>Hover Me</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByText('Hover Me'));
    
    // Advance timers partially
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // Move mouse away before delay completes
    fireEvent.mouseLeave(screen.getByText('Hover Me'));
    
    // Advance timers past the original delay
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // Tooltip should not appear
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();
  });

  test('renders tooltip with arrow by default', () => {
    render(
      <Tooltip content="Tooltip Text" delay={0}>
        <button>Hover Me</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByText('Hover Me'));
    
    // Advance timers to show tooltip
    act(() => {
      jest.advanceTimersByTime(0);
    });
    
    // There should be an arrow element (a div with h-2 w-2 classes)
    const arrowElement = document.querySelector('.h-2.w-2');
    expect(arrowElement).toBeInTheDocument();
  });

  test('does not render arrow when showArrow is false', () => {
    render(
      <Tooltip content="Tooltip Text" delay={0} showArrow={false}>
        <button>Hover Me</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByText('Hover Me'));
    
    // Advance timers to show tooltip
    act(() => {
      jest.advanceTimersByTime(0);
    });
    
    // There should not be an arrow element
    const arrowElement = document.querySelector('.h-2.w-2');
    expect(arrowElement).not.toBeInTheDocument();
  });

  test('applies custom className to tooltip', () => {
    render(
      <Tooltip content="Tooltip Text" delay={0} className="custom-tooltip-class">
        <button>Hover Me</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByText('Hover Me'));
    
    // Advance timers to show tooltip
    act(() => {
      jest.advanceTimersByTime(0);
    });
    
    const tooltipElement = screen.getByRole('tooltip');
    expect(tooltipElement).toHaveClass('custom-tooltip-class');
  });

  test('applies different color variants', () => {
    const { rerender } = render(
      <Tooltip content="Tooltip Text" delay={0} color="dark">
        <button>Hover Me</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByText('Hover Me'));
    act(() => {
      jest.advanceTimersByTime(0);
    });
    
    // Check dark variant (default)
    let tooltipElement = screen.getByRole('tooltip');
    expect(tooltipElement).toHaveClass('bg-gray-800');
    
    // Check light variant
    rerender(
      <Tooltip content="Tooltip Text" delay={0} color="light">
        <button>Hover Me</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByText('Hover Me'));
    act(() => {
      jest.advanceTimersByTime(0);
    });
    
    tooltipElement = screen.getByRole('tooltip');
    expect(tooltipElement).toHaveClass('bg-white');
    
    // Check primary variant
    rerender(
      <Tooltip content="Tooltip Text" delay={0} color="primary">
        <button>Hover Me</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByText('Hover Me'));
    act(() => {
      jest.advanceTimersByTime(0);
    });
    
    tooltipElement = screen.getByRole('tooltip');
    expect(tooltipElement).toHaveClass('bg-primary-600');
  });
}); 