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

layer(TestLayer)('a notice created from the administration', (it) => {
  it.effect('inserts it with its contexts and its relayers', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;
      const moderation = yield* Moderation;

      const id = yield* moderation.createNotice(
        notice({
          message: 'Une notice écrite depuis l’administration.',
          relayers: [RELAYER],
          contexts: [context({ domains: ['neuf.essai'] })],
        }),
      );

      const rows = yield* sql<{
        message: string;
        visibility: string;
        contributor_id: number | null;
        contexts: number;
        relayers: number;
      }>`
        SELECT n.message, n.visibility, n.contributor_id,
               (SELECT COUNT(*) FROM matching_context c WHERE c.notice_id = n.id) AS contexts,
               (SELECT COUNT(*) FROM relay r WHERE r.notice_id = n.id) AS relayers
          FROM notice n WHERE n.id = ${id}
      `;

      assert.strictEqual(
        rows[0]?.message,
        'Une notice écrite depuis l’administration.',
      );
      assert.strictEqual(rows[0]?.contributor_id, CONTRIBUTOR);
      assert.strictEqual(Number(rows[0]?.contexts), 1);
      assert.strictEqual(Number(rows[0]?.relayers), 1);

      yield* sql`DELETE FROM relay WHERE notice_id = ${id}`;
      yield* sql`DELETE FROM matching_context WHERE notice_id = ${id}`;
      yield* sql`DELETE FROM notice WHERE id = ${id}`;
    }),
  );

  it.effect('refuses an invalid notice without inserting anything', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;
      const moderation = yield* Moderation;

      const before = yield* sql<{
        total: number;
      }>`SELECT COUNT(*) AS total FROM notice`;

      const refusal = yield* moderation
        .createNotice(notice({ message: '' }))
        .pipe(Effect.flip);

      const after = yield* sql<{
        total: number;
      }>`SELECT COUNT(*) AS total FROM notice`;

      assert.strictEqual(refusal._tag, 'InvalidFields');
      assert.strictEqual(Number(after[0]?.total), Number(before[0]?.total));
    }),
  );
});

layer(TestLayer)('a notice deleted from the administration', (it) => {
  it.effect('takes its contexts, its relayers and its ratings with it', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;
      const moderation = yield* Moderation;

      yield* moderation.saveNotice(NOTICE, notice({ relayers: [RELAYER] }));
      yield* sql`
        INSERT INTO rating (notice_id, type, context_timestamp, reason)
             VALUES (${NOTICE}, 'display', NOW(), '')
      `;

      yield* moderation.deleteNotice(NOTICE);

      const left = yield* sql<{
        notices: number;
        contexts: number;
        relayers: number;
        ratings: number;
      }>`
        SELECT (SELECT COUNT(*) FROM notice WHERE id = ${NOTICE}) AS notices,
               (SELECT COUNT(*) FROM matching_context WHERE notice_id = ${NOTICE}) AS contexts,
               (SELECT COUNT(*) FROM relay WHERE notice_id = ${NOTICE}) AS relayers,
               (SELECT COUNT(*) FROM rating WHERE notice_id = ${NOTICE}) AS ratings
      `;

      assert.strictEqual(Number(left[0]?.notices), 0);
      assert.strictEqual(Number(left[0]?.contexts), 0);
      assert.strictEqual(Number(left[0]?.relayers), 0);
      assert.strictEqual(Number(left[0]?.ratings), 0);
    }),
  );

  it.effect('gives back the screenshot to remove from the store', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;
      const moderation = yield* Moderation;

      yield* sql`UPDATE notice SET screenshot = '81.png' WHERE id = ${NOTICE}`;

      assert.strictEqual(yield* moderation.deleteNotice(NOTICE), '81.png');
    }),
  );

  it.effect('refuses to delete a notice a contributor pins', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;
      const moderation = yield* Moderation;

      yield* sql`
        INSERT INTO pin (contributor_id, notice_id, sort)
             VALUES (${CONTRIBUTOR}, ${NOTICE}, 0)
      `;

      const refusal = yield* moderation.deleteNotice(NOTICE).pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'NoticePinned');
      yield* sql`DELETE FROM pin WHERE notice_id = ${NOTICE}`;
    }),
  );

  it.effect('refuses to delete a notice that does not exist', () =>
    Effect.gen(function* () {
      yield* seed;
      const moderation = yield* Moderation;

      const refusal = yield* moderation.deleteNotice(4242).pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'NoticeMissing');
    }),
  );
});

layer(TestLayer)('a contributor created and deleted', (it) => {
  const profile = {
    name: 'Nouvelle venue',
    title: null,
    email: 'venue@essai.test',
    website: null,
    intro: null,
    locale: 'fr',
    categories: ['conso'],
    enabled: true,
    pinned: [],
  };

  it.effect('inserts the contributor with its categories', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;
      const moderation = yield* Moderation;

      const id = yield* moderation.createContributor(profile);

      const rows = yield* sql<{
        name: string;
        categories: string;
        total_subscriptions: number;
      }>`SELECT name, categories, total_subscriptions FROM contributor WHERE id = ${id}`;

      assert.strictEqual(rows[0]?.name, 'Nouvelle venue');
      assert.strictEqual(rows[0]?.categories, 'conso');
      assert.strictEqual(Number(rows[0]?.total_subscriptions), 0);

      yield* moderation.deleteContributor(id);
    }),
  );

  it.effect('refuses an address that is not one', () =>
    Effect.gen(function* () {
      yield* seed;
      const moderation = yield* Moderation;

      const refusal = yield* moderation
        .createContributor({ ...profile, email: 'venue(at)essai' })
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'InvalidFields');
    }),
  );

  it.effect('gives back the images to remove from the store', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;
      const moderation = yield* Moderation;

      const id = yield* moderation.createContributor(profile);
      yield* sql`
        UPDATE contributor SET image = 'a.png', banner_image = 'b.png'
         WHERE id = ${id}
      `;

      const removed = yield* moderation.deleteContributor(id);

      assert.deepStrictEqual(
        [...removed],
        ['uploads/avatars/a.png', 'uploads/contributor_banners/b.png'],
      );
    }),
  );

  it.effect('refuses to delete a contributor that still signs notices', () =>
    Effect.gen(function* () {
      yield* seed;
      const moderation = yield* Moderation;

      const refusal = yield* moderation
        .deleteContributor(CONTRIBUTOR)
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'ContributorSignsNotices');
    }),
  );

  it.effect('refuses to delete a contributor that does not exist', () =>
    Effect.gen(function* () {
      yield* seed;
      const moderation = yield* Moderation;

      const refusal = yield* moderation
        .deleteContributor(4242)
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'ContributorMissing');
    }),
  );
});
