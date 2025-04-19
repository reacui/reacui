import React from 'react';

export const Grid = ({
  children,
  columns = 1,
  gap = 4,
  rowGap,
  columnGap,
  className = '',
  sm,
  md,
  lg,
  xl,
  alignItems = 'stretch',
  justifyItems = 'start',
  justifyContent = 'start',
  alignContent = 'start',
  ...props
}) => {
  // Function to generate grid column classes
  const getColumnsClass = (cols, breakpoint = '') => {
    if (!cols) return '';
    
    const bp = breakpoint ? `${breakpoint}:` : '';
    return `${bp}grid-cols-${cols}`;
  };

  // Generate responsive grid columns
  const columnsClasses = [
    getColumnsClass(columns),
    getColumnsClass(sm, 'sm'),
    getColumnsClass(md, 'md'),
    getColumnsClass(lg, 'lg'),
    getColumnsClass(xl, 'xl'),
  ].filter(Boolean).join(' ');

  // Gap classes
  const gapClass = gap !== undefined ? `gap-${gap}` : '';
  const rowGapClass = rowGap !== undefined ? `row-gap-${rowGap}` : '';
  const columnGapClass = columnGap !== undefined ? `column-gap-${columnGap}` : '';

  // Alignment classes
  const alignItemsClass = `items-${alignItems}`;
  const justifyItemsClass = `justify-items-${justifyItems}`;
  const justifyContentClass = `justify-${justifyContent}`;
  const alignContentClass = `content-${alignContent}`;

  return (
    <div
      className={`grid ${columnsClasses} ${gapClass} ${rowGapClass} ${columnGapClass} ${alignItemsClass} ${justifyItemsClass} ${justifyContentClass} ${alignContentClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Grid Item component for individual grid cells
export const GridItem = ({
  children,
  colSpan = 1,
  rowSpan = 1,
  colStart,
  colEnd,
  rowStart,
  rowEnd,
  className = '',
  ...props
}) => {
  // Span classes
  const colSpanClass = colSpan ? `col-span-${colSpan}` : '';
  const rowSpanClass = rowSpan ? `row-span-${rowSpan}` : '';
  
  // Start and end position classes
  const colStartClass = colStart ? `col-start-${colStart}` : '';
  const colEndClass = colEnd ? `col-end-${colEnd}` : '';
  const rowStartClass = rowStart ? `row-start-${rowStart}` : '';
  const rowEndClass = rowEnd ? `row-end-${rowEnd}` : '';

  return (
    <div
      className={`${colSpanClass} ${rowSpanClass} ${colStartClass} ${colEndClass} ${rowStartClass} ${rowEndClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Attach GridItem as a subcomponent
Grid.Item = GridItem;

export default Grid; 