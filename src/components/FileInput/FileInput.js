import React, { useState, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

const FileInput = forwardRef(({
  accept,
  multiple = false,
  maxFiles = 0,
  maxSize = 0,
  disabled = false,
  showPreview = false,
  dragActive = true,
  label = 'Choose a file',
  helperText,
  error,
  className = '',
  onChange,
  onDrop,
  ...props
}, ref) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    
    if (maxFiles > 0 && multiple && selectedFiles.length > maxFiles) {
      if (onChange) onChange({ error: `Cannot upload more than ${maxFiles} files` });
      return;
    }

    if (maxSize > 0) {
      const oversizedFiles = selectedFiles.filter(file => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        if (onChange) onChange({ error: `File size exceeds ${maxSize} bytes` });
        return;
      }
    }

    setFiles(selectedFiles);
    if (onChange) onChange({ files: selectedFiles });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    
    if (disabled) return;

    const droppedFiles = Array.from(event.dataTransfer.files);
    
    if (maxFiles > 0 && multiple && droppedFiles.length > maxFiles) {
      if (onDrop) onDrop({ error: `Cannot upload more than ${maxFiles} files` });
      return;
    }

    if (maxSize > 0) {
      const oversizedFiles = droppedFiles.filter(file => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        if (onDrop) onDrop({ error: `File size exceeds ${maxSize} bytes` });
        return;
      }
    }

    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const invalidFiles = droppedFiles.filter(file => {
        return !acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            return file.name.endsWith(type);
          } else {
            return file.type.match(new RegExp(type.replace('*', '.*')));
          }
        });
      });

      if (invalidFiles.length > 0) {
        if (onDrop) onDrop({ error: 'Some files have invalid types' });
        return;
      }
    }

    setFiles(droppedFiles);
    if (onDrop) onDrop({ files: droppedFiles });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isDragging && !disabled && dragActive) setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const getFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div
        className={`border-2 border-dashed rounded-md p-4 transition-colors cursor-pointer 
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${error ? 'border-red-500' : ''}
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'hover:border-gray-400'}`
        }
        onClick={!disabled ? handleClick : undefined}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          className="hidden"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />
        <div className="text-center">
          <p className="text-sm text-gray-600">{label}</p>
          {dragActive && <p className="text-xs text-gray-500 mt-1">Drag and drop files here or click to browse</p>}
          {helperText && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      </div>

      {showPreview && files.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Selected files:</p>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={`${file.name}-${index}`} className="text-sm border rounded-md p-2 flex justify-between">
                <span className="truncate max-w-xs">{file.name}</span>
                <span className="text-gray-500 ml-2">{getFileSize(file.size)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

FileInput.displayName = 'FileInput';

FileInput.propTypes = {
  /**
   * Defines the file types the file input should accept
   */
  accept: PropTypes.string,
  /**
   * Allows selecting multiple files
   */
  multiple: PropTypes.bool,
  /**
   * Maximum number of files that can be uploaded (0 for unlimited)
   */
  maxFiles: PropTypes.number,
  /**
   * Maximum size of files in bytes (0 for unlimited)
   */
  maxSize: PropTypes.number,
  /**
   * Disables the file input
   */
  disabled: PropTypes.bool,
  /**
   * Shows a preview of selected files
   */
  showPreview: PropTypes.bool,
  /**
   * Enables drag and drop functionality
   */
  dragActive: PropTypes.bool,
  /**
   * Text to display as the file input label
   */
  label: PropTypes.string,
  /**
   * Additional helper text
   */
  helperText: PropTypes.string,
  /**
   * Error message
   */
  error: PropTypes.string,
  /**
   * Additional class names
   */
  className: PropTypes.string,
  /**
   * Callback fired when files are selected
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when files are dropped
   */
  onDrop: PropTypes.func,
};

export default FileInput; 