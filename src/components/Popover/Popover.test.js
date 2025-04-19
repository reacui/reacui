import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Popover from './Popover';

describe('Popover Component', () => {
  // Clean up after each test
  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('renders trigger element', () => {
    render(
      <Popover trigger={<button>Trigger</button>}>
        Popover Content
      </Popover>
    );
    
    expect(screen.getByText('Trigger')).toBeInTheDocument();
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });

  test('shows popover content when trigger is clicked', () => {
    render(
      <Popover trigger={<button>Trigger</button>} triggerType="click">
        Popover Content
      </Popover>
    );
    
    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });

  test('hides popover content when clicked outside', () => {
    render(
      <div>
        <div data-testid="outside-element">Outside</div>
        <Popover trigger={<button>Trigger</button>} triggerType="click">
          Popover Content
        </Popover>
      </div>
    );
    
    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
    
    fireEvent.mouseDown(screen.getByTestId('outside-element'));
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });

  test('closes when escape key is pressed', () => {
    render(
      <Popover trigger={<button>Trigger</button>} triggerType="click">
        Popover Content
      </Popover>
    );
    
    fireEvent.click(screen.getByText('Trigger'));
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });

  test('renders arrow when showArrow is true', () => {
    render(
      <Popover trigger={<button>Trigger</button>} triggerType="click" showArrow={true}>
        Popover Content
      </Popover>
    );
    
    fireEvent.click(screen.getByText('Trigger'));
    
    // Check that an element with the arrow class exists
    const arrowElement = document.querySelector('.w-3.h-3');
    expect(arrowElement).toBeInTheDocument();
  });

  test('does not render arrow when showArrow is false', () => {
    render(
      <Popover trigger={<button>Trigger</button>} triggerType="click" showArrow={false}>
        Popover Content
      </Popover>
    );
    
    fireEvent.click(screen.getByText('Trigger'));
    
    // Check that no element with the arrow class exists
    const arrowElement = document.querySelector('.w-3.h-3');
    expect(arrowElement).not.toBeInTheDocument();
  });

  test('applies position class for top position', () => {
    render(
      <Popover trigger={<button data-testid="top-trigger">Top Position</button>} triggerType="click" position="top">
        Popover Content
      </Popover>
    );
    
    fireEvent.click(screen.getByTestId('top-trigger'));
    expect(screen.getByRole('tooltip')).toHaveClass('bottom-0');
  });

  test('applies position class for bottom position', () => {
    render(
      <Popover trigger={<button data-testid="bottom-trigger">Bottom Position</button>} triggerType="click" position="bottom">
        Popover Content
      </Popover>
    );
    
    fireEvent.click(screen.getByTestId('bottom-trigger'));
    expect(screen.getByRole('tooltip')).toHaveClass('top-0');
  });

  test('applies custom className', () => {
    render(
      <Popover 
        trigger={<button>Trigger</button>} 
        triggerType="click" 
        className="custom-class"
      >
        Popover Content
      </Popover>
    );
    
    fireEvent.click(screen.getByText('Trigger'));
    expect(document.querySelector('.custom-class')).toBeInTheDocument();
  });
}); 