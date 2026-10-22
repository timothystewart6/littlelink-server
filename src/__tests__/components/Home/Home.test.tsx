import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../../components/Home/Home';
import type { RuntimeConfig } from '../../../config/runtimeConfig';

describe('<Home />', () => {
  test('renders without exploding', () => {
    const { container } = render(<Home config={{} as RuntimeConfig} />);
    expect(container).toBeTruthy();
  });

  test('BUTTON_ORDER positions custom buttons alongside built-in buttons', () => {
    const config = {
      BUTTON_ORDER: 'JOIN,YOUTUBE,SUPPORT',
      YOUTUBE: 'https://youtube.com/example',
      CUSTOM_BUTTON_NAME: 'JOIN,SUPPORT',
      CUSTOM_BUTTON_TEXT: 'Join,Support',
      CUSTOM_BUTTON_URL: 'https://example.com/join,https://example.com/support',
      CUSTOM_BUTTON_COLOR: '#000000,#000000',
      CUSTOM_BUTTON_TEXT_COLOR: '#ffffff,#ffffff',
      CUSTOM_BUTTON_ALT_TEXT: 'Join,Support',
    } as RuntimeConfig;

    const { container } = render(<Home config={config} />);
    const hrefs = Array.from(container.querySelectorAll('a.button')).map(a =>
      a.getAttribute('href'),
    );

    expect(hrefs).toEqual([
      'https://example.com/join',
      'https://youtube.com/example',
      'https://example.com/support',
    ]);
  });
});
