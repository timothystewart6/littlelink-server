/**
 * @jest-environment jsdom
 */

import { trackGoogleEvent } from '../google';

describe('google.js', () => {
  beforeEach(() => {
    window.gtag = jest.fn();
  });

  afterEach(() => {
    delete window.gtag;
  });

  it('should call gtag with event', () => {
    trackGoogleEvent('youtube-button');
    expect(window.gtag).toHaveBeenCalledWith('event', 'youtube-button');
  });
});
