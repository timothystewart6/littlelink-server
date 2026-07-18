import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

jest.mock('../../Home/Home', () => {
  const React = require('react');
  return function MockHome() {
    return React.createElement('div', null, 'Home');
  };
});

describe('<App />', () => {
  test('renders without exploding', () => {
    const App = require('../App').default;
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(container).toBeTruthy();
  });
});
