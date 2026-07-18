import Sort from '../Sort';
import React from 'react';
import Button from '../../Button/Button';

import { render } from '@testing-library/react';

describe('<Sort />', () => {
  test('renders without exploding', () => {
    const { container } = render(<Sort />);
    expect(container).toBeTruthy();
  });

  test('Sorts Buttons by order', () => {
    const { container } = render(
      <Sort>
        <Button
          name="twitch"
          href="twitch.tv"
          displayName="Twitch"
          logo="/icons/twitch.svg"
          order={0}
        />
        <Button
          name="youtube"
          href="youtube.com"
          displayName="YouTube"
          logo="/icons/youtube.svg"
          order={-1}
        />
        <Button
          name="linkedin"
          href="linkedin.com"
          displayName="LinkedIn"
          logo="/icons/linkedin.svg"
          order={2}
        />
        <Button
          name="github"
          href="github.com"
          displayName="GitHub"
          logo="/icons/github.svg"
          order={1}
        />
      </Sort>,
    );

    const links = container.querySelectorAll('a');
    expect(links.length).toEqual(4);
    // Descending order by `order` prop: linkedin(2), github(1), twitch(0), youtube(-1)
    expect(links[0].getAttribute('href')).toEqual('linkedin.com');
    expect(links[1].getAttribute('href')).toEqual('github.com');
    expect(links[2].getAttribute('href')).toEqual('twitch.tv');
    expect(links[3].getAttribute('href')).toEqual('youtube.com');
  });
});
