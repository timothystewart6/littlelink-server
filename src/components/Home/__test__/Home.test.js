import Home from '../Home';
import React from 'react';
import { render } from 'react-dom';
import renderer from 'react-test-renderer';

describe('<Home />', () => {
  test('renders without exploding', () => {
    const root = document.getElementById('root');
    if (root) {
      render(<Home />);
    }
  });
  test('<Home /> snapshot', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
