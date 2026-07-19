export function trackMatomoEvent(event: string): void {
  window._paq?.push(['trackEvent', event]);
}
