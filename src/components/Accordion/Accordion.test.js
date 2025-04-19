import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Accordion from './Accordion';

describe('Accordion Component', () => {
  // Mock ResizeObserver
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
  
  const mockItems = [
    {
      title: 'Section 1',
      content: 'Content for section 1',
    },
    {
      title: 'Section 2',
      content: 'Content for section 2',
    },
    {
      title: 'Section 3',
      content: 'Content for section 3',
    },
  ];

  test('renders accordion with all items', () => {
    render(<Accordion items={mockItems} />);
    
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Section 3')).toBeInTheDocument();
  });

  test('shows content when item is clicked', () => {
    render(<Accordion items={mockItems} />);
    
    // Get the section button and initially check its state
    const section1Button = screen.getByText('Section 1');
    
    // Initial state should be closed
    const contentDiv = document.getElementById('accordion-content-0');
    expect(contentDiv).toHaveAttribute('data-state', 'closed');
    
    // Click to open
    fireEvent.click(section1Button);
    
    // Content should be visible now
    expect(contentDiv).toHaveAttribute('data-state', 'open');
  });

  test('closes opened item when clicked again', () => {
    render(<Accordion items={mockItems} />);
    
    const section1Button = screen.getByText('Section 1');
    const contentDiv = document.getElementById('accordion-content-0');
    
    // Click to open
    fireEvent.click(section1Button);
    expect(contentDiv).toHaveAttribute('data-state', 'open');
    
    // Click again to close
    fireEvent.click(section1Button);
    expect(contentDiv).toHaveAttribute('data-state', 'closed');
  });

  test('closes previously opened item when a new one is clicked with allowMultiple=false', () => {
    render(<Accordion items={mockItems} allowMultiple={false} />);
    
    const section1Button = screen.getByText('Section 1');
    const section2Button = screen.getByText('Section 2');
    
    const content1Div = document.getElementById('accordion-content-0');
    const content2Div = document.getElementById('accordion-content-1');
    
    // Open first section
    fireEvent.click(section1Button);
    expect(content1Div).toHaveAttribute('data-state', 'open');
    
    // Now open second section
    fireEvent.click(section2Button);
    
    // First section should be closed
    expect(content1Div).toHaveAttribute('data-state', 'closed');
    // Second section should be open
    expect(content2Div).toHaveAttribute('data-state', 'open');
  });

  test('allows multiple open items when allowMultiple=true', () => {
    render(<Accordion items={mockItems} allowMultiple={true} />);
    
    const section1Button = screen.getByText('Section 1');
    const section2Button = screen.getByText('Section 2');
    
    const content1Div = document.getElementById('accordion-content-0');
    const content2Div = document.getElementById('accordion-content-1');
    
    // Open first section
    fireEvent.click(section1Button);
    expect(content1Div).toHaveAttribute('data-state', 'open');
    
    // Now open second section
    fireEvent.click(section2Button);
    
    // Both sections should be open
    expect(content1Div).toHaveAttribute('data-state', 'open');
    expect(content2Div).toHaveAttribute('data-state', 'open');
  });

  test('renders with default open items', () => {
    render(<Accordion items={mockItems} defaultOpen={[1]} />);
    
    // Second item (index 1) should be open
    const content2Div = document.getElementById('accordion-content-1');
    expect(content2Div).toHaveAttribute('data-state', 'open');
  });

  test('renders items with icons when provided', () => {
    const itemsWithIcons = [
      {
        title: 'Section 1',
        content: 'Content for section 1',
        icon: <span data-testid="icon">🔍</span>,
      },
    ];
    
    render(<Accordion items={itemsWithIcons} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  test('applies custom class names', () => {
    render(
      <Accordion
        items={mockItems}
        className="custom-accordion"
        itemClassName="custom-item"
      />
    );
    
    expect(document.querySelector('.custom-accordion')).toBeInTheDocument();
    expect(document.querySelector('.custom-item')).toBeInTheDocument();
  });
}); 