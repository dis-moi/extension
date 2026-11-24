import type { ServedImage } from '@dismoi/api/application/Images';

// No immutable cache: notice screenshots are named after the notice
// identifier, so they are replaced in place.
const CACHE = 'public, max-age=3600';

export const imageResponse = (served: ServedImage | null): Response => {
  if (served === null) {
    return new Response('Image not found', { status: 404 });
  }

  return new Response(new Uint8Array(served.bytes), {
    headers: {
      'content-type': served.contentType,
      'cache-control': CACHE,
      // The type is derived from the extension of the stored name: without
      // this header a polyglot file could be sniffed and executed under the
      // origin.
      'x-content-type-options': 'nosniff',
    },
  });
};
