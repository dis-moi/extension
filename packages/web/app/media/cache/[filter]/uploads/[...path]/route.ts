import { Effect } from 'effect';
import { Images } from '@dismoi/api/application/Images';
import { isFilterName } from '@dismoi/api/domain/Thumbnail';
import { parseUploadPath } from '@dismoi/api/domain/UploadedImage';
import { run } from '@dismoi/web/lib/effect';
import { imageResponse } from '@dismoi/web/lib/image';

export const dynamic = 'force-dynamic';

export const GET = async (
  _request: Request,
  { params }: { params: { filter: string; path?: string[] } },
): Promise<Response> => {
  const asked = parseUploadPath(params.path ?? []);
  const filter = params.filter;

  if (asked === null || !isFilterName(filter)) {
    return new Response('Image not found', { status: 404 });
  }

  return imageResponse(
    await run(
      Effect.gen(function* () {
        const images = yield* Images;
        return yield* images.thumbnail(filter, asked.field, asked.fileName);
      }),
    ),
  );
};
