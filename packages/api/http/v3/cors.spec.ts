import { describe, expect, it } from 'vitest';
import { CORS_HEADERS, PREFLIGHT_HEADERS } from './cors';

describe('CORS headers served on V3', () => {
  it('allows any origin, as forced_allow_origin_value did', () => {
    expect(CORS_HEADERS['access-control-allow-origin']).toBe('*');
  });

  it('announces the two methods V3 accepts', () => {
    expect(PREFLIGHT_HEADERS['access-control-allow-methods']).toBe('POST, GET');
  });

  it('caches the preflight for an hour, as nelmio_cors did', () => {
    expect(PREFLIGHT_HEADERS['access-control-max-age']).toBe('3600');
  });

  it('allows the content type the clients post with', () => {
    expect(PREFLIGHT_HEADERS['access-control-allow-headers']).toBe(
      'Content-Type',
    );
  });

  it('varies on the origin, so caches do not mix answers', () => {
    expect(PREFLIGHT_HEADERS['vary']).toBe('Origin');
  });
});
