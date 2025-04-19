import React from 'react';

const TableHeader = ({ children, className = '', ...props }) => {
  return (
    <thead 
      className={`bg-gray-50 dark:bg-gray-800 ${className}`}
      {...props}
    >
      {children}
    </thead>
  );
};

const TableBody = ({ children, className = '', ...props }) => {
  return (
    <tbody 
      className={`bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 ${className}`}
      {...props}
    >
      {children}
    </tbody>
  );
};

const TableRow = ({ children, className = '', ...props }) => {
  return (
    <tr 
      className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
};

const TableHeaderCell = ({ children, className = '', ...props }) => {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${className}`}
      {...props}
    >
      {children}
    </th>
  );
};

const TableCell = ({ children, className = '', ...props }) => {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 ${className}`}
      {...props}
    >
      {children}
    </td>
  );
};

export const Table = ({ children, className = '', ...props }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table 
        className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 ${className}`}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.HeaderCell = TableHeaderCell;
Table.Cell = TableCell;

export default Table; 