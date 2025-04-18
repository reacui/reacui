import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  test('renders card with default props', () => {
    render(<Card>Card Content</Card>);
    const card = screen.getByText('Card Content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('border-gray-200');
  });

  test('renders card with custom className', () => {
    render(<Card className="custom-class">Card Content</Card>);
    const card = screen.getByText('Card Content');
    expect(card).toHaveClass('custom-class');
  });

  test('renders card with header', () => {
    render(
      <Card>
        <Card.Header>Header Content</Card.Header>
      </Card>
    );
    const header = screen.getByText('Header Content');
    expect(header).toBeInTheDocument();
  });

  test('renders card with title', () => {
    render(
      <Card>
        <Card.Title>Card Title</Card.Title>
      </Card>
    );
    const title = screen.getByText('Card Title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-lg');
  });

  test('renders card with description', () => {
    render(
      <Card>
        <Card.Description>Card Description</Card.Description>
      </Card>
    );
    const description = screen.getByText('Card Description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm');
  });

  test('renders card with content', () => {
    render(
      <Card>
        <Card.Content>Content Area</Card.Content>
      </Card>
    );
    const content = screen.getByText('Content Area');
    expect(content).toBeInTheDocument();
  });

  test('renders card with footer', () => {
    const { container } = render(
      <Card>
        <Card.Footer data-testid="card-footer">Footer Content</Card.Footer>
      </Card>
    );
    const footer = screen.getByTestId('card-footer');
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
    expect(footer).toHaveClass('border-t');
  });

  test('renders complete card with all sections', () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Complete Card</Card.Title>
          <Card.Description>This is a complete card with all sections</Card.Description>
        </Card.Header>
        <Card.Content>Main content goes here</Card.Content>
        <Card.Footer>Action buttons</Card.Footer>
      </Card>
    );
    
    expect(screen.getByText('Complete Card')).toBeInTheDocument();
    expect(screen.getByText('This is a complete card with all sections')).toBeInTheDocument();
    expect(screen.getByText('Main content goes here')).toBeInTheDocument();
    expect(screen.getByText('Action buttons')).toBeInTheDocument();
  });
}); 