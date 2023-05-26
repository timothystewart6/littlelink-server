import App from '../App';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

describe('<App />', () => {
  test('renders without exploding', () => {
    const root = document.getElementById('root');
    if (root) {
      root.render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
    }
  });
  test('<App /> snapshot', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
