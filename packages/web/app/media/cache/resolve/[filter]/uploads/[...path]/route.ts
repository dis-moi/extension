import { isFilterName } from '@dismoi/api/domain/Thumbnail';
import {
  parseUploadPath,
  thumbnailStoragePath,
} from '@dismoi/api/domain/UploadedImage';

export const dynamic = 'force-dynamic';

/**
 * The address LiipImagine served for a thumbnail it had not cached yet.
 *
 * It is not a leftover: production answers with it today, for 77 of the 178
 * contributors, on the two filters nothing requests often enough to keep
 * them in the cache. That cache sits on the instance disk, which no bucket
 * covers, so a deployment of the PHP backend empties it and the addresses
 * come back. Anything holding one of them — a payload an extension
 * refreshed before the cutover — must not meet a 404 here.
 *
 * Like LiipImagine, this redirects to the address without the segment
 * rather than serving the image: the client then holds the canonical one.
 *
 * The target is relative, which RFC 7231 allows. Composing an absolute one
 * would mean naming the host, and behind the reverse proxy `request.url`
 * carries the address the server listens on — the redirect would send the
 * client to an internal name.
 */
export const GET = (
  _request: Request,
  { params }: { params: { filter: string; path?: string[] } },
): Response => {
  const asked = parseUploadPath(params.path ?? []);
  const filter = params.filter;

  if (asked === null || !isFilterName(filter)) {
    return new Response('Image not found', { status: 404 });
  }

  return new Response(null, {
    status: 301,
    headers: {
      location: `/${thumbnailStoragePath(filter, asked.field, asked.fileName)}`,
    },
  });
};
