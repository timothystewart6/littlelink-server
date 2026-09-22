import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import FontAwesomeInit from './FontAwesomeInit';

describe('FontAwesomeInit component', () => {
  it('renders children passed as prop', () => {
    const { container } = render(
      <FontAwesomeInit>Test Children</FontAwesomeInit>,
    );
    expect(container.innerHTML).toContain('Test Children');
  });

  it('renders children as function children', () => {
    const { container } = render(
      <>
        <FontAwesomeInit>
          <div>Nested</div>
        </FontAwesomeInit>
      </>,
    );
    expect(container.innerHTML).toContain('Nested');
  });
});