import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Sort from './Sort';

describe('Sort component', () => {
  it('renders children in original order', () => {
    const elements = [
      <div key="1" data-order={1}>
        First
      </div>,
      <div key="2" data-order={2}>
        Second
      </div>,
      <div key="3" data-order={3}>
        Third
      </div>,
    ];
    render(<Sort>{elements}</Sort>);
    const first = screen.getByText('First');
    const second = screen.getByText('Second');
    const third = screen.getByText('Third');
    expect(first).toBeInTheDocument();
    expect(second).toBeInTheDocument();
    expect(third).toBeInTheDocument();
  });

  it('renders single child', () => {
    render(
      <Sort>
        <div data-order={1}>Only child</div>
      </Sort>,
    );
    const child = screen.getByText('Only child');
    expect(child).toBeInTheDocument();
  });

  it('renders children with custom order prop', () => {
    const elements = [
      <div key="1" data-order={3}>
        Third
      </div>,
      <div key="2" data-order={1}>
        First
      </div>,
      <div key="3" data-order={2}>
        Second
      </div>,
    ];
    render(<Sort>{elements}</Sort>);
    const first = screen.getByText('First');
    const second = screen.getByText('Second');
    const third = screen.getByText('Third');
    expect(first).toBeInTheDocument();
    expect(second).toBeInTheDocument();
    expect(third).toBeInTheDocument();
  });
});
