import { TrackedUrl } from './trackedUrl';

interface PlausibleEvent {
  name: string;
  url: TrackedUrl;
  props?: Record<string, string | number | boolean>;
}

export default class PlausibleTracker {
  constructor(
    private readonly domain: string,
    private readonly apiUrl = 'https://plausible.io/api/event',
  ) {}

  async track({ name, url, props }: PlausibleEvent): Promise<void> {
    try {
      await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: this.domain, name, url, props }),
      });
    } catch {
      // Analytics must never break the extension
    }
  }

  trackPageview(url: TrackedUrl): Promise<void> {
    return this.track({ name: 'pageview', url });
  }
}
