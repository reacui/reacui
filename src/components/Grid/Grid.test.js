import React from 'react';
import { render, screen } from '@testing-library/react';
import Grid, { GridItem } from './grid';

describe('Grid component', () => {
  test('renders grid with default props', () => {
    render(
      <Grid data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );
    
    const grid = screen.getByTestId('grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('gap-4');
  });

  test('renders grid with custom columns', () => {
    render(
      <Grid columns={3} data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Grid>
    );
    
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('grid-cols-3');
  });

  test('renders grid with custom gap', () => {
    render(
      <Grid gap={8} data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );
    
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('gap-8');
  });

  test('renders grid with custom row and column gaps', () => {
    render(
      <Grid rowGap={6} columnGap={4} data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );
    
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('row-gap-6');
    expect(grid).toHaveClass('column-gap-4');
  });

  test('renders grid with responsive columns', () => {
    render(
      <Grid columns={1} sm={2} md={3} lg={4} xl={5} data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );
    
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('sm:grid-cols-2');
    expect(grid).toHaveClass('md:grid-cols-3');
    expect(grid).toHaveClass('lg:grid-cols-4');
    expect(grid).toHaveClass('xl:grid-cols-5');
  });

  test('renders grid with custom alignment', () => {
    render(
      <Grid 
        alignItems="center" 
        justifyItems="end"
        justifyContent="between"
        alignContent="center"
        data-testid="grid"
      >
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );
    
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('items-center');
    expect(grid).toHaveClass('justify-items-end');
    expect(grid).toHaveClass('justify-between');
    expect(grid).toHaveClass('content-center');
  });

  test('renders grid with custom className', () => {
    render(
      <Grid className="custom-class" data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );
    
    const grid = screen.getByTestId('grid');
    expect(grid).toHaveClass('custom-class');
  });

  test('renders GridItem with default props', () => {
    render(
      <Grid columns={3}>
        <GridItem data-testid="grid-item">Item 1</GridItem>
      </Grid>
    );
    
    const gridItem = screen.getByTestId('grid-item');
    expect(gridItem).toBeInTheDocument();
    expect(gridItem).toHaveClass('col-span-1');
    expect(gridItem).toHaveClass('row-span-1');
  });

  test('renders GridItem with custom spans', () => {
    render(
      <Grid columns={3}>
        <GridItem colSpan={2} rowSpan={3} data-testid="grid-item">Item 1</GridItem>
      </Grid>
    );
    
    const gridItem = screen.getByTestId('grid-item');
    expect(gridItem).toHaveClass('col-span-2');
    expect(gridItem).toHaveClass('row-span-3');
  });

  test('renders GridItem with custom start and end positions', () => {
    render(
      <Grid columns={3}>
        <GridItem 
          colStart={2} 
          colEnd={4} 
          rowStart={1} 
          rowEnd={3} 
          data-testid="grid-item"
        >
          Item 1
        </GridItem>
      </Grid>
    );
    
    const gridItem = screen.getByTestId('grid-item');
    expect(gridItem).toHaveClass('col-start-2');
    expect(gridItem).toHaveClass('col-end-4');
    expect(gridItem).toHaveClass('row-start-1');
    expect(gridItem).toHaveClass('row-end-3');
  });

  test('renders GridItem with custom className', () => {
    render(
      <Grid columns={3}>
        <GridItem className="custom-item-class" data-testid="grid-item">Item 1</GridItem>
      </Grid>
    );
    
    const gridItem = screen.getByTestId('grid-item');
    expect(gridItem).toHaveClass('custom-item-class');
  });

  test('renders Grid.Item as a subcomponent', () => {
    render(
      <Grid columns={3}>
        <Grid.Item data-testid="grid-item">Item 1</Grid.Item>
      </Grid>
    );
    
    const gridItem = screen.getByTestId('grid-item');
    expect(gridItem).toBeInTheDocument();
  });
}); 