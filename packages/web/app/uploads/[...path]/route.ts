import { Effect } from 'effect';
import { Images } from '@dismoi/api/application/Images';
import { parseUploadPath } from '@dismoi/api/domain/UploadedImage';
import { run } from '@dismoi/web/lib/effect';
import { imageResponse } from '@dismoi/web/lib/image';

export const dynamic = 'force-dynamic';

export const GET = async (
  _request: Request,
  { params }: { params: { path?: string[] } },
): Promise<Response> => {
  const asked = parseUploadPath(params.path ?? []);

  if (asked === null) {
    return new Response('Image introuvable', { status: 404 });
  }

  return imageResponse(
    await run(
      Effect.gen(function* () {
        const images = yield* Images;
        return yield* images.original(asked.field, asked.fileName);
      }),
    ),
  );
};
