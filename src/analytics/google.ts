export function trackGoogleEvent(action: string): void {
  window.gtag?.('event', action);
}
