import { Layer } from 'effect';
import { HttpRouter, HttpServer } from 'effect/http';
import { ApiLive } from '@dismoi/api/Live';
import { RoutesV3 } from '@dismoi/api/http/v3/routes';

/**
 * The V3 API, served by Next in place of the PHP backend.
 *
 * `HttpRouter.toWebHandler` gives a `(Request) => Promise<Response>`
 * function, which is exactly the signature an App Router route handler
 * expects. Everything else — routing, reading, serialisation — lives in
 * `@dismoi/api` and knows nothing of Next.
 *
 * The route catches everything under `/api/v3`, and it is the Effect router
 * that tells the paths apart. The former hosts (`api.dismoi.io`,
 * `notices.bulles.fr`) will point here: the absolute addresses of the
 * payload are built from the `Host` header, so each host keeps serving its
 * own URLs.
 */

const { handler } = HttpRouter.toWebHandler(
  Layer.mergeAll(RoutesV3, ApiLive).pipe(
    Layer.provide(HttpServer.layerServices),
  ),
);

/**
 * `force-dynamic`: these answers depend on the database and on the host
 * called, and Next must neither pre-render nor cache them. The
 * `cache-control` header of the response already says what clients may keep.
 */
export const dynamic = 'force-dynamic';

export const GET = handler;
export const POST = handler;
export const OPTIONS = handler;
