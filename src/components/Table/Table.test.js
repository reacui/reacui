import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from './Table';

describe('Table component', () => {
  test('renders table with default props', () => {
    const { container } = render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>John Doe</Table.Cell>
            <Table.Cell>john@example.com</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    
    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
    expect(table).toHaveClass('min-w-full');
    expect(table).toHaveClass('divide-y');
  });

  test('renders Table.Header correctly', () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );
    
    const thead = document.querySelector('thead');
    expect(thead).toBeInTheDocument();
    expect(thead).toHaveClass('bg-gray-50');
  });
  
  test('renders Table.Body correctly', () => {
    render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    
    const tbody = document.querySelector('tbody');
    expect(tbody).toBeInTheDocument();
    expect(tbody).toHaveClass('bg-white');
    expect(tbody).toHaveClass('divide-y');
  });
  
  test('renders Table.Row correctly', () => {
    render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    
    const tr = document.querySelector('tr');
    expect(tr).toBeInTheDocument();
    expect(tr).toHaveClass('hover:bg-gray-50');
  });
  
  test('renders Table.HeaderCell correctly', () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Header Text</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );
    
    const th = screen.getByText('Header Text');
    expect(th).toBeInTheDocument();
    expect(th).toHaveClass('px-6');
    expect(th).toHaveClass('py-3');
    expect(th).toHaveClass('text-left');
  });
  
  test('renders Table.Cell correctly', () => {
    render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Cell Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    
    const td = screen.getByText('Cell Content');
    expect(td).toBeInTheDocument();
    expect(td).toHaveClass('px-6');
    expect(td).toHaveClass('py-4');
    expect(td).toHaveClass('whitespace-nowrap');
  });
  
  test('applies custom className to Table', () => {
    const { container } = render(
      <Table className="custom-table-class">
        <Table.Body>
          <Table.Row>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    
    const table = container.querySelector('table');
    expect(table).toHaveClass('custom-table-class');
  });
  
  test('applies custom className to Table.Header', () => {
    render(
      <Table>
        <Table.Header className="custom-header-class">
          <Table.Row>
            <Table.HeaderCell>Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );
    
    const thead = document.querySelector('thead');
    expect(thead).toHaveClass('custom-header-class');
  });

  test('applies custom className to Table.Body', () => {
    render(
      <Table>
        <Table.Body className="custom-body-class">
          <Table.Row>
            <Table.Cell>Content</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    
    const tbody = document.querySelector('tbody');
    expect(tbody).toHaveClass('custom-body-class');
  });
}); 