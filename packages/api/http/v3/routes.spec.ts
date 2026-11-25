import { beforeEach, describe, expect, it } from 'vitest';
import { Effect, Layer } from 'effect';
import { HttpRouter, HttpServer } from 'effect/http';
import { V3Reads, type AskedPage } from '../../application/V3Reads';
import { V3Writes } from '../../application/V3Writes';
import { RoutesV3 } from './routes';

let askedContributors: Array<ReadonlyArray<number> | null>;
let askedPages: AskedPage[];

const reads = Layer.succeed(
  V3Reads,
  V3Reads.of({
    contributors: Effect.succeed([]),
    contributor: () => Effect.succeed(null),
    notices: (asked) =>
      Effect.sync(() => {
        askedPages.push(asked);
        return { notices: [], total: 0 };
      }),
    detailedNotice: () => Effect.succeed(null),
    noticeWhateverItsVisibility: () => Effect.succeed(null),
    targetingContexts: (contributors) =>
      Effect.sync(() => {
        askedContributors.push(contributors);
        return [];
      }),
    restrictedContexts: Effect.succeed([{ id: 1, urlRegex: '.*' }]),
  }),
);

const writes = Layer.succeed(
  V3Writes,
  V3Writes.of({
    rate: () => Effect.void,
    refreshSubscriptions: () => Effect.void,
    recordContribution: () => Effect.die('not asked'),
  }),
);

const { handler } = HttpRouter.toWebHandler(
  Layer.mergeAll(RoutesV3, reads, writes).pipe(
    Layer.provide(HttpServer.layerServices),
  ),
);

const call = (path: string): Promise<Response> =>
  handler(
    new Request(`https://api.dismoi.io${path}`, {
      headers: { host: 'api.dismoi.io' },
    }),
  );

beforeEach(() => {
  askedContributors = [];
  askedPages = [];
});

describe('the paths the PHP backend answered', () => {
  it('serves the restricted contexts under both spellings', async () => {
    for (const path of [
      '/api/v3/restricted-contexts',
      '/api/v3/restrictedcontexts',
    ]) {
      expect((await call(path)).status, path).toBe(200);
    }
  });

  it('serves the targeting contexts under both spellings', async () => {
    for (const path of [
      '/api/v3/matching-contexts',
      '/api/v3/matchingcontexts',
    ]) {
      expect((await call(path)).status, path).toBe(200);
    }
  });
});

describe('the contributors filter of the targeting contexts', () => {
  it('reads the bracketed form the clients build', async () => {
    await call('/api/v3/matching-contexts?contributors%5B%5D=55');

    expect(askedContributors).toEqual([[55]]);
  });

  it('reads every value of a repeated bracketed parameter', async () => {
    await call(
      '/api/v3/matching-contexts?contributors%5B%5D=55&contributors%5B%5D=13',
    );

    expect(askedContributors).toEqual([[55, 13]]);
  });

  it('reads the comma separated form', async () => {
    await call('/api/v3/matching-contexts?contributors=%5B55,13%5D');

    expect(askedContributors).toEqual([[55, 13]]);
  });

  it('restricts to nothing when the value names no contributor', async () => {
    await call('/api/v3/matching-contexts?contributors=abc');

    expect(askedContributors).toEqual([[0]]);
  });

  it('restricts nothing when the parameter carries no value', async () => {
    await call('/api/v3/matching-contexts?contributors=');

    expect(askedContributors).toEqual([null]);
  });

  it('restricts nothing when the parameter is absent', async () => {
    await call('/api/v3/matching-contexts');

    expect(askedContributors).toEqual([null]);
  });
});

describe('the paging of the notices', () => {
  it('defaults to the thousand of the PHP controller', async () => {
    await call('/api/v3/notices');

    expect(askedPages).toEqual([{ limit: 1000, offset: 0 }]);
  });

  it('reads an unparseable limit as zero, as the PHP cast does', async () => {
    await call('/api/v3/notices?limit=abc');

    expect(askedPages).toEqual([{ limit: 0, offset: 0 }]);
  });

  it('reads an unparseable offset as zero', async () => {
    await call('/api/v3/notices?offset=abc&limit=5');

    expect(askedPages).toEqual([{ limit: 5, offset: 0 }]);
  });
});
