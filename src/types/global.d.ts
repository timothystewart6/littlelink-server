interface Window {
  gtag?: (command: 'event', eventName: string) => void;
  umami?: { track: (eventName: string) => void };
  _paq?: unknown[];
}
