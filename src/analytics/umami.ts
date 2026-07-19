export function trackUmamiEvent(event: string): void {
  window.umami?.track(event);
}
