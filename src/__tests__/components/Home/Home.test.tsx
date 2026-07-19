import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../../components/Home/Home';
import type { RuntimeConfig } from '../../../config/runtimeConfig';

describe('<Home />', () => {
  test('renders without exploding', () => {
    const { container } = render(<Home config={{} as RuntimeConfig} />);
    expect(container).toBeTruthy();
  });
});
