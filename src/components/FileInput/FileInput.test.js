import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileInput from './FileInput';

describe('FileInput component', () => {
  test('renders file input with default props', () => {
    render(<FileInput />);
    const dropZone = screen.getByText('Choose a file');
    expect(dropZone).toBeInTheDocument();
    expect(screen.getByText('Drag and drop files here or click to browse')).toBeInTheDocument();
  });

  test('renders with custom label', () => {
    render(<FileInput label="Upload your documents" />);
    const label = screen.getByText('Upload your documents');
    expect(label).toBeInTheDocument();
  });

  test('renders with helper text', () => {
    render(<FileInput helperText="Maximum file size: 5MB" />);
    const helperText = screen.getByText('Maximum file size: 5MB');
    expect(helperText).toBeInTheDocument();
  });

  test('renders with error message', () => {
    render(<FileInput error="File is too large" />);
    const error = screen.getByText('File is too large');
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass('text-red-500');
  });

  test('applies disabled state', () => {
    render(<FileInput disabled />);
    // Find the main dropzone div, which should have the appropriate classes
    const dropzoneDiv = screen.getByText('Choose a file').closest('div.border-2');
    expect(dropzoneDiv).toHaveClass('cursor-not-allowed');
    expect(dropzoneDiv).toHaveClass('opacity-60');
  });

  test('applies drag-active class when dragActive is false', () => {
    render(<FileInput dragActive={false} />);
    expect(screen.queryByText('Drag and drop files here or click to browse')).not.toBeInTheDocument();
  });

  test('handles click to open file browser', () => {
    render(<FileInput />);
    const mockClick = jest.fn();
    const originalClick = HTMLInputElement.prototype.click;
    HTMLInputElement.prototype.click = mockClick;
    
    const container = screen.getByText('Choose a file').closest('div.border-2');
    fireEvent.click(container);
    
    expect(mockClick).toHaveBeenCalledTimes(1);
    HTMLInputElement.prototype.click = originalClick;
  });

  test('applies custom className', () => {
    render(<FileInput className="custom-class" />);
    const container = screen.getByText('Choose a file').closest('div.flex');
    expect(container).toHaveClass('custom-class');
  });

  test('handles file selection onChange', () => {
    const handleChange = jest.fn();
    render(<FileInput onChange={handleChange} />);
    
    const file = new File(['test content'], 'test.png', { type: 'image/png' });
    const input = document.querySelector('input[type="file"]');
    
    Object.defineProperty(input, 'files', {
      value: [file]
    });
    
    fireEvent.change(input);
    
    expect(handleChange).toHaveBeenCalledWith({ files: [file] });
  });

  test('handles drag events', () => {
    render(<FileInput />);
    const dropzone = screen.getByText('Choose a file').closest('div.border-2');
    
    // Test dragOver
    fireEvent.dragOver(dropzone);
    expect(dropzone).toHaveClass('border-dashed');
    
    // Test dragLeave
    fireEvent.dragLeave(dropzone);
    expect(dropzone).toHaveClass('border-dashed');
  });
}); 