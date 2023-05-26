import Sort from '../Sort';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import Button from '../../Button/Button';
import youtubeLogo from '../../../icons/youtube.svg';
import twitchLogo from '../../../icons/twitch.svg';
import linkedinLogo from '../../../icons/linkedin.svg';
import githubLogo from '../../../icons/github.svg';
import renderer from 'react-test-renderer';

describe('<Sort />', () => {
  let container = null;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test('renders without exploding', () => {
    const root = document.getElementById('root');

    if (root) {
      root.render(<Sort />);
    }
  });

  test('Sorts Buttons by order', () => {
    const tree = renderer
      .create(
        <Sort>
          <Button
            name="twitch"
            href="twitch.tv"
            displayName="Twitch"
            logo={twitchLogo}
            order={0}
          />

          <Button
            name="youtube"
            href="youtube.com"
            displayName="YouTube"
            logo={youtubeLogo}
            order={-1}
          />
          <Button
            name="linkedin"
            href="linkedin.com"
            displayName="LinkedIn"
            logo={linkedinLogo}
            order={2}
          />
          <Button
            name="github"
            href="github.com"
            displayName="GitHub"
            logo={githubLogo}
            order={1}
          />
        </Sort>,
      )
      .toJSON();

    expect(tree.length).toEqual(4);
    expect(tree[0].props.href).toEqual('linkedin.com');
    expect(tree[1].props.href).toEqual('github.com');
    expect(tree[2].props.href).toEqual('twitch.tv');
    expect(tree[3].props.href).toEqual('youtube.com');
    expect(tree).toMatchSnapshot();
  });
});
