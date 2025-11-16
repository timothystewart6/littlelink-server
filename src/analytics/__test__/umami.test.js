import { trackUmamiEvent } from '../umami';

describe('umami.js', () => {
  const windowSpy = jest.spyOn(global, 'window', 'get');
  const mockedUmami = jest.fn();
  const originalWindow = { ...window };
  windowSpy.mockImplementation(() => ({
    ...originalWindow,
    umami: {
      track: mockedUmami,
    },
  }));
  it('should call umami with event', () => {
    trackUmamiEvent('youtube-button');
    expect(mockedUmami).toBeCalledWith('youtube-button');
    windowSpy.mockRestore();
  });
});
