process.env['DISMOI_DB_PORT'] = process.env['DISMOI_DB_PORT_TEST'] ?? '3311';
process.env['DISMOI_DB_NAME'] = 'dismoi_test';

import { assert, layer } from '@effect/vitest';
import { Effect, Layer } from 'effect';
import { SqlClient } from 'effect/sql';
import {
  Moderation,
  type SubmittedContext,
  type SubmittedNotice,
} from '../application/Moderation';
import { DatabaseLive } from '../infrastructure/sql/Database';
import { ModerationSqlLive } from '../infrastructure/sql/ModerationSql';

const TestLayer = ModerationSqlLive.pipe(Layer.provideMerge(DatabaseLive));

const NOTICE = 81;
const CONTRIBUTOR = 8;
const RELAYER = 9;

const context = (over: Partial<SubmittedContext> = {}): SubmittedContext => ({
  id: null,
  description: null,
  exampleUrl: null,
  urlRegex: '/article/',
  excludeUrlRegex: null,
  querySelector: null,
  xpath: null,
  domains: [],
  domainsSets: [],
  ...over,
});

const notice = (over: Partial<SubmittedNotice> = {}): SubmittedNotice => ({
  message: 'Un message tenable.',
  note: null,
  visibility: 'public',
  locale: 'fr',
  excludeUrlRegex: null,
  expires: null,
  unpublishedOnExpiration: false,
  contributorId: CONTRIBUTOR,
  relayers: [],
  contexts: [context()],
  ...over,
});

const seed = Effect.gen(function* () {
  const sql = yield* SqlClient.SqlClient;

  yield* sql`DELETE FROM matching_context WHERE notice_id = ${NOTICE}`;
  yield* sql`DELETE FROM relay WHERE notice_id = ${NOTICE}`;
  yield* sql`DELETE FROM notice WHERE id = ${NOTICE}`;
  yield* sql`DELETE FROM contributor WHERE id IN ${sql.in([CONTRIBUTOR, RELAYER])}`;
  yield* sql`DELETE FROM domains_set WHERE id IN ${sql.in([41, 42])}`;

  yield* sql`
    INSERT INTO contributor (id, name, enabled, total_subscriptions, locale)
         VALUES (${CONTRIBUTOR}, 'Autrice', 1, 0, 'fr'),
                (${RELAYER}, 'Relayeuse', 1, 0, 'fr')
  `;
  yield* sql`
    INSERT INTO notice (id, message, visibility, unpublished_on_expiration, updated, contributor_id)
         VALUES (${NOTICE}, 'Message initial', 'draft', 0, NOW(), ${CONTRIBUTOR})
  `;
  yield* sql`
    INSERT INTO domains_set (id, name, created_at, updated_at)
         VALUES (41, 'Marchands', NOW(), NOW()), (42, 'Presse', NOW(), NOW())
  `;
});

const contextIds = Effect.gen(function* () {
  const sql = yield* SqlClient.SqlClient;
  const rows = yield* sql<{ id: number }>`
    SELECT id FROM matching_context WHERE notice_id = ${NOTICE} ORDER BY id
  `;
  return rows.map((row) => row.id);
});

const attachedSets = (contextId: number) =>
  Effect.gen(function* () {
    const sql = yield* SqlClient.SqlClient;
    const rows = yield* sql<{ domains_set_id: number }>`
      SELECT domains_set_id FROM matching_context_domains_set
       WHERE matching_context_id = ${contextId} ORDER BY domains_set_id
    `;
    return rows.map((row) => row.domains_set_id);
  });

layer(TestLayer)('a notice saved from the administration', (it) => {
  it.effect('attaches the submitted domains sets to the context', () =>
    Effect.gen(function* () {
      yield* seed;
      const moderation = yield* Moderation;

      yield* moderation.saveNotice(
        NOTICE,
        notice({ contexts: [context({ domainsSets: [41, 42] })] }),
      );

      const [contextId] = yield* contextIds;
      assert.isDefined(contextId);
      assert.deepStrictEqual(
        [...(yield* attachedSets(contextId ?? 0))],
        [41, 42],
      );
    }),
  );

  it.effect('detaches a domains set left out of the submission', () =>
    Effect.gen(function* () {
      yield* seed;
      const moderation = yield* Moderation;

      yield* moderation.saveNotice(
        NOTICE,
        notice({ contexts: [context({ domainsSets: [41, 42] })] }),
      );
      const [first] = yield* contextIds;

      yield* moderation.saveNotice(
        NOTICE,
        notice({ contexts: [context({ id: first ?? 0, domainsSets: [42] })] }),
      );

      assert.deepStrictEqual([...(yield* attachedSets(first ?? 0))], [42]);
    }),
  );

  it.effect('creates the domains the context names', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;
      const moderation = yield* Moderation;

      yield* moderation.saveNotice(
        NOTICE,
        notice({ contexts: [context({ domains: ['exemple.fr'] })] }),
      );

      const rows = yield* sql<{ name: string }>`
        SELECT d.name FROM domain_name d
          JOIN matching_context_domain_name l ON l.domain_name_id = d.id
          JOIN matching_context c ON c.id = l.matching_context_id
         WHERE c.notice_id = ${NOTICE}
      `;

      assert.deepStrictEqual(
        rows.map((row) => row.name),
        ['exemple.fr'],
      );
    }),
  );

  it.effect('removes the contexts absent from the submission', () =>
    Effect.gen(function* () {
      yield* seed;
      const moderation = yield* Moderation;

      yield* moderation.saveNotice(
        NOTICE,
        notice({ contexts: [context(), context({ urlRegex: '/autre/' })] }),
      );
      assert.strictEqual((yield* contextIds).length, 2);

      yield* moderation.saveNotice(NOTICE, notice({ contexts: [context()] }));
      assert.strictEqual((yield* contextIds).length, 1);
    }),
  );

  it.effect('rewrites the relayers whole', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;
      const moderation = yield* Moderation;

      yield* moderation.saveNotice(NOTICE, notice({ relayers: [RELAYER] }));
      yield* moderation.saveNotice(NOTICE, notice({ relayers: [] }));

      const rows = yield* sql<{ total: number }>`
        SELECT COUNT(*) AS total FROM relay WHERE notice_id = ${NOTICE}
      `;

      assert.strictEqual(Number(rows[0]?.total), 0);
    }),
  );

  it.effect('refuses a notice with no context', () =>
    Effect.gen(function* () {
      yield* seed;
      const moderation = yield* Moderation;

      const refusal = yield* moderation
        .saveNotice(NOTICE, notice({ contexts: [] }))
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'InvalidFields');
    }),
  );

  it.effect('refuses a notice that does not exist', () =>
    Effect.gen(function* () {
      yield* seed;
      const moderation = yield* Moderation;

      const refusal = yield* moderation
        .saveNotice(4242, notice())
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'NoticeMissing');
    }),
  );
});
