// What nelmio_cors answered on `^/api/v3/`. `forced_allow_origin_value: '*'`
// means the origin is echoed as `*` whatever the caller sends, including no
// origin at all.
export const CORS_HEADERS: Readonly<Record<string, string>> = {
  'access-control-allow-origin': '*',
};

// Symfony answered the preflight without `access-control-allow-headers`, which
// left it unable to authorise the `Content-Type: application/json` its own
// clients post with. Granting it is the one deliberate departure: a preflight
// that permits nothing is only a slower refusal.
export const PREFLIGHT_HEADERS: Readonly<Record<string, string>> = {
  ...CORS_HEADERS,
  'access-control-allow-methods': 'POST, GET',
  'access-control-allow-headers': 'Content-Type',
  'access-control-max-age': '3600',
  vary: 'Origin',
};
