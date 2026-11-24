// Plausible derives the session from the hostname and shows only the pathname,
// so every event is sent on one made-up host, as its Events API documentation
// recommends for non-web apps: https://plausible.io/docs/events-api
const EXTENSION_ORIGIN = 'app://extension';

const INTERNAL_URL = `${EXTENSION_ORIGIN}/internal`;

const WEB_PROTOCOLS = ['http:', 'https:'];

const parseUrl = (url?: string): URL | undefined => {
  try {
    return url ? new URL(url) : undefined;
  } catch {
    return undefined;
  }
};

/** Address of a screen of the extension, from its internal route. */
export const screenUrl = (pathname: string): string =>
  `${EXTENSION_ORIGIN}${pathname}`;

/**
 * Address standing for the site the user is visiting. Only the domain leaves
 * the browser: paths and query strings can identify a person.
 */
export const siteUrl = (visitedUrl?: string): string => {
  const parsed = parseUrl(visitedUrl);
  if (!parsed || !WEB_PROTOCOLS.includes(parsed.protocol)) {
    return INTERNAL_URL;
  }
  return `${EXTENSION_ORIGIN}/sites/${parsed.hostname.replace(/^www\./, '')}`;
};
