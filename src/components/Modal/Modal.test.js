import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();
  
  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test('renders nothing when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        Test Modal Content
      </Modal>
    );
    
    expect(screen.queryByText('Test Modal Content')).not.toBeInTheDocument();
  });

  test('renders modal content when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        Test Modal Content
      </Modal>
    );
    
    expect(screen.getByText('Test Modal Content')).toBeInTheDocument();
  });

  test('renders title when provided', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Modal Title">
        Test Modal Content
      </Modal>
    );
    
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
  });

  test('calls onClose when escape key is pressed', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        Test Modal Content
      </Modal>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when clicking outside the modal', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        Test Modal Content
      </Modal>
    );
    
    // Click the backdrop (parent div)
    fireEvent.click(document.querySelector('.fixed.inset-0'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when clicking inside the modal', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        Test Modal Content
      </Modal>
    );
    
    // Click inside the modal content
    fireEvent.click(screen.getByText('Test Modal Content'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('calls onClose when close button is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Modal Title">
        Test Modal Content
      </Modal>
    );
    
    fireEvent.click(screen.getByLabelText('Close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('respects closeOnEsc prop', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} closeOnEsc={false}>
        Test Modal Content
      </Modal>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('respects closeOnOutsideClick prop', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} closeOnOutsideClick={false}>
        Test Modal Content
      </Modal>
    );
    
    // Click the backdrop (parent div)
    fireEvent.click(document.querySelector('.fixed.inset-0'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });
}); 