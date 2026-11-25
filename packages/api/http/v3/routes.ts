import { Effect, Layer } from 'effect';
import {
  Headers,
  HttpRouter,
  HttpServerRequest,
  HttpServerResponse,
} from 'effect/http';
import { V3Writes } from '../../application/V3Writes';
import { V3Reads } from '../../application/V3Reads';
import { CORS_HEADERS, PREFLIGHT_HEADERS } from './cors';
import { encodePhpJson } from './phpJson';
import {
  CATEGORIES,
  serialiseTargetingContext,
  serialiseRestrictedContext,
  serialiseContributor,
  serialiseNotice,
} from './serialize';

// No HttpApi and no schemas, deliberately: V3 is not a contract we define
// but one we inherit, and its body must come out byte for byte. An encoder
// built on Schema would take back control of the key order and the
// escaping.

const HEADERS = Headers.fromInput({
  'content-type': 'application/json',
  // Thirty minutes of private cache, set by Symfony on the whole of V3.
  'cache-control': 'private, max-age=1800, must-revalidate',
  ...CORS_HEADERS,
});

const preflight = HttpServerResponse.text('', {
  status: 200,
  headers: Headers.fromInput(PREFLIGHT_HEADERS),
});

const json = (body: unknown, status = 200) =>
  HttpServerResponse.text(encodePhpJson(body), { status, headers: HEADERS });

// Production serves the same data under api.dismoi.io and under
// notices.bulles.fr, each with its own URLs: that is what lets the installed
// extensions resolve what they have cached.
const requestOrigin = Effect.gen(function* () {
  const request = yield* HttpServerRequest.HttpServerRequest;
  const headers = request.headers;

  const host = headers['x-forwarded-host'] ?? headers['host'];
  const scheme = headers['x-forwarded-proto'] ?? 'https';

  if (host === undefined) {
    return yield* Effect.die(
      new Error('Request with no Host header: the origin cannot be told.'),
    );
  }

  return `${scheme}://${host}`;
});

// HttpExceptionListener only returns JSON when the request carries
// Content-Type: application/json, which the extension does on its POSTs but
// not on its GETs. The HTML error page of Symfony is not reproduced: call.ts
// of the extension only looks at the status code.
const failure = (status: number, message: string) =>
  Effect.gen(function* () {
    const request = yield* HttpServerRequest.HttpServerRequest;
    const type = request.headers['content-type'] ?? '';

    return type.includes('json')
      ? json({ error: message }, status)
      : HttpServerResponse.text(message, {
          status,
          headers: Headers.fromInput({
            'content-type': 'text/plain; charset=UTF-8',
            ...CORS_HEADERS,
          }),
        });
  });

// The `(int)` cast of PHP: a string naming no number is zero, and zero is
// not the same thing as an absent parameter.
const phpInteger = (raw: string): number => {
  const value = Number.parseInt(raw, 10);
  return Number.isNaN(value) ? 0 : value;
};

// `(int) $request->get('limit', 1000)`: the default answers an absent
// parameter only. A present one goes through the cast, so `limit=abc` is a
// limit of zero and returns nothing — not the default page.
const integer = (raw: string | null | undefined, fallback: number): number => {
  if (raw === undefined || raw === null) return fallback;
  return phpInteger(raw);
};

// `$request->get('contributors')`, which receives two forms.
//
// `contributors[]=55&contributors[]=13` is what buildQueryString of the
// extension builds for an array, and what the mobile application stores;
// PHP parses it into an array and passes it on untouched. The other form,
// `contributors=[55,13]`, is a string the controller splits on commas.
//
// A piece naming no number is kept rather than dropped: PHP hands the raw
// string to the query, where MySQL casts `id IN ('abc')` to zero and the
// filter matches nothing. Dropping it would turn a filter that excludes
// everything into no filter at all, and answer with the whole table.
const askedContributors = (
  parameters: URLSearchParams,
): ReadonlyArray<number> | null => {
  const repeated = parameters.getAll('contributors[]');
  if (repeated.length > 0) return repeated.map(phpInteger);

  const raw = parameters.get('contributors');
  if (raw === null || raw === '') return null;

  return raw
    .replace(/^\[+/, '')
    .replace(/\]+$/, '')
    .split(',')
    .map((piece) => phpInteger(piece.trim()));
};

const queryParameters = Effect.gen(function* () {
  const request = yield* HttpServerRequest.HttpServerRequest;
  return new URL(request.url, 'http://internal').searchParams;
});

const noContent = HttpServerResponse.text('', {
  status: 204,
  headers: HEADERS,
});

// An unreadable body becomes null rather than an error, like json_decode of
// PHP: these endpoints receive requests from extensions some versions of
// which are several years old.
const rawJsonBody = Effect.gen(function* () {
  const request = yield* HttpServerRequest.HttpServerRequest;
  return yield* request.json.pipe(Effect.orElseSucceed(() => null));
});

const jsonBody = rawJsonBody.pipe(Effect.map(record));

function record(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

const string = (value: unknown, fallback: string): string =>
  typeof value === 'string' ? value : fallback;

// These two answer under two spellings each, hyphenated and not: the PHP
// actions carried two @Route annotations apiece, and clients exist for both.
// The extension calls the hyphenated ones, the mobile application the others.
const restrictedContexts = Effect.gen(function* () {
  const reads = yield* V3Reads;
  const contexts = yield* reads.restrictedContexts;
  return json(contexts.map(serialiseRestrictedContext));
});

const targetingContexts = Effect.gen(function* () {
  const reads = yield* V3Reads;
  const origin = yield* requestOrigin;
  const parameters = yield* queryParameters;

  const contexts = yield* reads.targetingContexts(
    askedContributors(parameters),
  );

  return json(
    contexts.map((context) => serialiseTargetingContext(origin, context)),
  );
});

export const RoutesV3 = Layer.mergeAll(
  // nelmio_cors answered the preflight for every path under `^/api/v3/`,
  // before the controllers were ever reached.
  HttpRouter.add('OPTIONS', '/api/v3/*', Effect.succeed(preflight)),

  HttpRouter.add('GET', '/api/v3/categories', Effect.succeed(json(CATEGORIES))),

  HttpRouter.add('GET', '/api/v3/restrictedcontexts', restrictedContexts),
  HttpRouter.add('GET', '/api/v3/restricted-contexts', restrictedContexts),

  HttpRouter.add('GET', '/api/v3/matchingcontexts', targetingContexts),
  HttpRouter.add('GET', '/api/v3/matching-contexts', targetingContexts),

  HttpRouter.add(
    'GET',
    '/api/v3/notices',
    Effect.gen(function* () {
      const reads = yield* V3Reads;
      const origin = yield* requestOrigin;
      const parameters = yield* queryParameters;

      const contributor = integer(parameters.get('contributor'), 0);
      const page = yield* reads.notices({
        // `(int) $request->get('contributor')` is 0 when the parameter is
        // absent, and the PHP treats 0 as "no filter".
        ...(contributor === 0 ? {} : { contributorId: contributor }),
        limit: integer(parameters.get('limit'), 1000),
        offset: integer(parameters.get('offset'), 0),
      });

      return json(
        page.notices.map((notice) =>
          serialiseNotice(origin, notice, { with: false }),
        ),
      );
    }),
  ),

  HttpRouter.add(
    'GET',
    '/api/v3/notices/:id',
    Effect.gen(function* () {
      const reads = yield* V3Reads;
      const origin = yield* requestOrigin;
      const params = yield* HttpRouter.params;

      const detail = yield* reads.detailedNotice(integer(params['id'], 0));
      if (detail === null) return yield* failure(404, 'Notice not found.');

      return json(
        serialiseNotice(origin, detail.notice, {
          with: true,
          contributor: detail.contributor,
          relayers: detail.relayers,
        }),
      );
    }),
  ),

  HttpRouter.add(
    'GET',
    '/api/v3/contributors',
    Effect.gen(function* () {
      const reads = yield* V3Reads;
      const origin = yield* requestOrigin;
      const contributors = yield* reads.contributors;

      if (contributors.length === 0) {
        return yield* failure(404, 'No contributors exist');
      }

      return json(
        contributors.map((contributor) =>
          serialiseContributor(origin, contributor),
        ),
      );
    }),
  ),

  HttpRouter.add(
    'GET',
    '/api/v3/contributors/:id',
    Effect.gen(function* () {
      const reads = yield* V3Reads;
      const origin = yield* requestOrigin;
      const params = yield* HttpRouter.params;

      const contributor = yield* reads.contributor(integer(params['id'], 0));
      if (contributor === null) {
        return yield* failure(404, 'Contributor not found');
      }

      return json(serialiseContributor(origin, contributor));
    }),
  ),

  HttpRouter.add(
    'POST',
    '/api/v3/notices/:id/ratings',
    Effect.gen(function* () {
      const writes = yield* V3Writes;
      const params = yield* HttpRouter.params;
      const body = yield* jsonBody;

      const context = record(body['context']);

      return yield* writes
        .rate({
          noticeId: integer(params['id'], 0),
          ratingType: string(body['ratingType'], ''),
          url: string(context['url'], ''),
          // The PHP backend replaces absences with an empty string, and the
          // matching columns are not nullable in the database.
          geolocation: string(context['geolocation'], ''),
          reason: string(body['reason'], ''),
        })
        .pipe(
          Effect.as(noContent),
          Effect.catchTag('NoticeNotFound', () =>
            failure(404, 'Notice not found.'),
          ),
        );
    }),
  ),

  HttpRouter.add(
    'POST',
    '/api/v3/subscriptions/:extensionId',
    Effect.gen(function* () {
      const writes = yield* V3Writes;
      const params = yield* HttpRouter.params;
      const body = yield* rawJsonBody;

      // The body is an array of identifiers. `json_decode(...) ?? []`
      // accepts an empty body; a body of any other shape gives an empty
      // list, hence a complete unsubscribe.
      const identifiers = Array.isArray(body)
        ? body
            .map((value) => Number(value))
            .filter((value) => Number.isInteger(value))
        : [];

      return yield* writes
        .refreshSubscriptions(params['extensionId'] ?? '', identifiers)
        .pipe(
          Effect.as(noContent),
          Effect.catchTag('UnknownContributor', (unknown) =>
            failure(422, `Contributor ${unknown.id} does not exist`),
          ),
        );
    }),
  ),

  HttpRouter.add(
    'POST',
    '/api/v3/contributions',
    Effect.gen(function* () {
      const writes = yield* V3Writes;
      const origin = yield* requestOrigin;
      const body = yield* jsonBody;

      const author = record(body['contributor']);
      const recipient = body['toContributorId'];
      const toContributorId =
        recipient === undefined || recipient === null
          ? null
          : integer(String(recipient), 0);

      return yield* writes
        .recordContribution({
          url: string(body['url'], ''),
          contributorName: string(author['name'], ''),
          contributorEmail: string(author['email'], ''),
          message: string(body['message'], ''),
          toContributorId,
          // `question` follows the flag when it is given, and otherwise the
          // mere presence of a recipient.
          question:
            body['question'] === undefined
              ? toContributorId !== null && toContributorId !== 0
              : Boolean(body['question']),
        })
        .pipe(
          Effect.map((created) =>
            json(serialiseNotice(origin, created.notice, { with: false }), 201),
          ),
          Effect.catchTag('InvalidContribution', (invalid) =>
            failure(422, invalid.reason),
          ),
        );
    }),
  ),

  // A trompe-l'oeil from the start: PostContributorRatingAction reduces to
  // return new JsonResponse('', 204). Kept as it is so as not to break the
  // installed extension, which calls it.
  HttpRouter.add(
    'POST',
    '/api/v3/contributors/:id/ratings',
    Effect.succeed(noContent),
  ),
);
