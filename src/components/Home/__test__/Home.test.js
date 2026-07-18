import Home from '../Home';
import React from 'react';
import { render } from '@testing-library/react';

describe('<Home />', () => {
  test('renders without exploding', () => {
    const { container } = render(<Home config={{}} />);
    expect(container).toBeTruthy();
  });
});
