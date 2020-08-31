export const stripUrlProtocol = (url: string): string =>
  (u => u.host + u.pathname)(new URL(url));
