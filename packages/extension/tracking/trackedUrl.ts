import { Brand } from 'types';

// Plausible derives the session from the hostname and shows only the pathname,
// so every event is sent on one made-up host, as its Events API documentation
// recommends for non-web apps: https://plausible.io/docs/events-api
const EXTENSION_ORIGIN = 'app://extension';

/**
 * An address that is safe to send to the analytics service. Only this module
 * builds one, so a raw page address cannot reach the tracker by mistake.
 */
export type TrackedUrl = Brand<string, 'TrackedUrl'>;

const INTERNAL_URL = `${EXTENSION_ORIGIN}/internal` as TrackedUrl;

const WEB_PROTOCOLS = ['http:', 'https:'];

const parseUrl = (url?: string): URL | undefined => {
  try {
    return url ? new URL(url) : undefined;
  } catch {
    return undefined;
  }
};

/** Address of a screen of the extension, from its internal route. */
export const screenUrl = (pathname: string): TrackedUrl =>
  `${EXTENSION_ORIGIN}${pathname}` as TrackedUrl;

/**
 * Address standing for the site the user is visiting. Only the domain leaves
 * the browser: paths and query strings can identify a person.
 */
export const siteUrl = (visitedUrl?: string): TrackedUrl => {
  const parsed = parseUrl(visitedUrl);
  if (!parsed || !WEB_PROTOCOLS.includes(parsed.protocol)) {
    return INTERNAL_URL;
  }
  const domain = parsed.hostname.replace(/^www\./, '');
  return `${EXTENSION_ORIGIN}/sites/${domain}` as TrackedUrl;
};
