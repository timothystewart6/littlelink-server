import Avatar from '../Avatar';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<Avatar />', () => {
  test('renders without exploding', () => {
    const root = document.getElementById('root');
    if (root) {
      root.render(<Avatar />);
    }
  });
  test('<Avatar /> snapshot', () => {
    const tree = renderer.create(<Avatar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
