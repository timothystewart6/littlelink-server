/**
 * @jest-environment jsdom
 */

import { trackUmamiEvent } from '../umami';

describe('umami.js', () => {
  beforeEach(() => {
    window.umami = {
      track: jest.fn(),
    };
  });

  afterEach(() => {
    delete window.umami;
  });

  it('should call umami with event', () => {
    trackUmamiEvent('youtube-button');
    expect(window.umami.track).toHaveBeenCalledWith('youtube-button');
  });
});
