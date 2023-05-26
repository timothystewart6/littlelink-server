import Button from '../Button';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<Button />', () => {
  test('renders without exploding', () => {
    const root = document.getElementById('root');
    if (root) {
      root.render(<Button />);
    }
  });
  test('<Button /> snapshot', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
