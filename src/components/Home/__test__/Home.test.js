import Home from '../Home';
import React from 'react';
import { createRoot } from 'react-dom/client';
import renderer from 'react-test-renderer';

describe('<Home />', () => {
  test('renders without exploding', () => {
    const container = document.getElementById('root');
    if (container) {
      const root = createRoot(container);
      root.render(<Home />);
    }
  });
  test('<Home /> snapshot', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
