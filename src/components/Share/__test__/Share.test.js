import Share from '../Share';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<Share />', () => {
  test('renders without exploding', () => {
    const root = document.getElementById('root');
    if (root) {
      root.render(<Share />);
    }
  });
  test('<Share /> snapshot', () => {
    const tree = renderer.create(<Share />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
