import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import HomePage from './page';

describe('HomePage', () => {
  it('renders', () => {
    const { container } = render(<HomePage />);
  });
});