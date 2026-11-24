// Set before the layer reads the environment.
process.env['DISMOI_DB_PORT'] = process.env['DISMOI_DB_PORT_TEST'] ?? '3311';
process.env['DISMOI_DB_NAME'] = 'dismoi_test';
delete process.env['DISMOI_SMTP_HOST'];

import { assert, layer } from '@effect/vitest';
import { beforeEach } from 'vitest';
import { Effect, Layer } from 'effect';
import { SqlClient } from 'effect/sql';
import { Mailer, type Message } from '../application/Mailer';
import { V3Writes } from '../application/V3Writes';
import { DatabaseLive } from '../infrastructure/sql/Database';
import { V3WritesSqlLive } from '../infrastructure/sql/V3WritesSql';
import { V3ReadsSqlLive } from '../infrastructure/sql/V3ReadsSql';
import { ApiLive } from '../Live';

// A test database separate from the development one: these tests empty and
// rewrite tables, which must not happen to the production data loaded next
// to it.
const seed = Effect.gen(function* () {
  const sql = yield* SqlClient.SqlClient;

  // DELETE in dependency order: TRUNCATE would refuse a table referenced by
  // a foreign key, and disabling the checks would only hold for the current
  // connection.
  for (const table of [
    'rating',
    'subscription',
    'extension',
    'matching_context_domain_name',
    'matching_context_domains_set',
    'matching_context',
    'domains_set_domain',
    'domain_name',
    'pin',
    'relay',
    'notice',
    'user_contributor',
    'contributor',
  ]) {
    yield* sql`DELETE FROM ${sql(table)}`;
  }

  yield* sql`
    INSERT INTO contributor (id, name, email, enabled, total_subscriptions, locale)
         VALUES (1, 'Essai', 'essai@exemple.fr', 1, 0, 'fr'),
                (2, 'Autre', 'autre@exemple.fr', 1, 0, 'fr')
  `;
  yield* sql`
    INSERT INTO notice
         (id, message, contributor_id, visibility, created, updated,
          unpublished_on_expiration)
         VALUES (10, 'Une notice publique', 1, 'public', NOW(), NOW(), 0),
                (11, 'Un brouillon', 1, 'draft', NOW(), NOW(), 0)
  `;
});

layer(ApiLive)('V3 writes', (it) => {
  it.effect('records a rating and recomputes the counters', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;
      const writes = yield* V3Writes;

      yield* writes.rate({
        noticeId: 10,
        ratingType: 'like',
        url: 'https://exemple.fr/page',
        geolocation: '',
        reason: '',
      });

      const ratings = yield* sql<{
        type: string;
        context_url: string;
        reason: string;
      }>`SELECT type, context_url, reason FROM rating WHERE notice_id = 10`;
      assert.strictEqual(ratings.length, 1);
      assert.strictEqual(ratings[0]?.type, 'like');
      assert.strictEqual(ratings[0]?.context_url, 'https://exemple.fr/page');

      const notices = yield* sql<{ liked_count: number }>`
        SELECT liked_count FROM notice WHERE id = 10
      `;
      assert.strictEqual(notices[0]?.liked_count, 1);
    }),
  );

  it.effect(
    'undoes a like with its opposite, liked_count being a balance and not a tally',
    () =>
      Effect.gen(function* () {
        yield* seed;
        const sql = yield* SqlClient.SqlClient;
        const writes = yield* V3Writes;

        const rate = (ratingType: string) =>
          writes.rate({
            noticeId: 10,
            ratingType,
            url: 'https://exemple.fr/page',
            geolocation: '',
            reason: '',
          });

        yield* rate('like');
        yield* rate('unlike');

        const notices = yield* sql<{ liked_count: number }>`
        SELECT liked_count FROM notice WHERE id = 10
      `;
        assert.strictEqual(notices[0]?.liked_count, 0);

        const ratings = yield* sql<{ n: number }>`
        SELECT COUNT(*) AS n FROM rating WHERE notice_id = 10
      `;
        assert.strictEqual(ratings[0]?.n, 2, 'both rows are kept');
      }),
  );

  it.effect('refuses to rate a notice that is not served', () =>
    Effect.gen(function* () {
      yield* seed;
      const writes = yield* V3Writes;

      const failure = yield* writes
        .rate({
          noticeId: 11,
          ratingType: 'like',
          url: 'https://exemple.fr/page',
          geolocation: '',
          reason: '',
        })
        .pipe(Effect.flip);

      assert.strictEqual(failure._tag, 'NoticeNotFound');
    }),
  );

  it.effect('truncates a context URL that is too long', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;
      const writes = yield* V3Writes;

      yield* writes.rate({
        noticeId: 10,
        ratingType: 'display',
        url: `https://exemple.fr/${'a'.repeat(2000)}`,
        geolocation: '',
        reason: '',
      });

      const ratings = yield* sql<{ length: number }>`
        SELECT CHAR_LENGTH(context_url) AS length
          FROM rating WHERE notice_id = 10
      `;
      assert.strictEqual(ratings[0]?.length, 1000);
    }),
  );

  it.effect('creates the extension and its subscriptions', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;
      const writes = yield* V3Writes;

      yield* writes.refreshSubscriptions('ext-abc', [1, 2]);

      const extensions = yield* sql<{ n: number }>`
        SELECT COUNT(*) AS n FROM extension WHERE id = 'ext-abc'
      `;
      assert.strictEqual(extensions[0]?.n, 1);

      const subscriptions = yield* sql<{ contributor_id: number }>`
        SELECT contributor_id FROM subscription
         WHERE extension_id = 'ext-abc' ORDER BY contributor_id
      `;
      assert.deepStrictEqual(
        subscriptions.map((row) => row.contributor_id),
        [1, 2],
      );
    }),
  );

  it.effect('removes the subscriptions absent from the new list', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;
      const writes = yield* V3Writes;

      yield* writes.refreshSubscriptions('ext-abc', [1, 2]);
      yield* writes.refreshSubscriptions('ext-abc', [2]);

      const subscriptions = yield* sql<{ contributor_id: number }>`
        SELECT contributor_id FROM subscription WHERE extension_id = 'ext-abc'
      `;
      assert.deepStrictEqual(
        subscriptions.map((row) => row.contributor_id),
        [2],
      );
    }),
  );

  it.effect('unsubscribes from everything on an empty list', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;
      const writes = yield* V3Writes;

      yield* writes.refreshSubscriptions('ext-abc', [1]);
      yield* writes.refreshSubscriptions('ext-abc', []);

      const subscriptions = yield* sql<{ n: number }>`
        SELECT COUNT(*) AS n FROM subscription WHERE extension_id = 'ext-abc'
      `;
      assert.strictEqual(subscriptions[0]?.n, 0);
    }),
  );

  it.effect(
    'refuses the whole list when one contributor is unknown, rather than apply the valid half',
    () =>
      Effect.gen(function* () {
        yield* seed;
        const sql = yield* SqlClient.SqlClient;
        const writes = yield* V3Writes;

        const failure = yield* writes
          .refreshSubscriptions('ext-abc', [1, 9999])
          .pipe(Effect.flip);

        assert.strictEqual(failure._tag, 'UnknownContributor');

        const subscriptions = yield* sql<{ n: number }>`
        SELECT COUNT(*) AS n FROM subscription WHERE extension_id = 'ext-abc'
      `;
        assert.strictEqual(subscriptions[0]?.n, 0);
      }),
  );

  it.effect(
    'records a contribution as a draft, creates its unknown author and targets the path and the domain of the address',
    () =>
      Effect.gen(function* () {
        yield* seed;
        const sql = yield* SqlClient.SqlClient;
        const writes = yield* V3Writes;

        const created = yield* writes.recordContribution({
          url: 'https://boutique.exemple.fr/panier?x=1',
          contributorName: 'Camille',
          contributorEmail: 'camille@exemple.fr',
          message: 'Attention à ce vendeur.',
          toContributorId: null,
          question: false,
        });

        assert.strictEqual(created.notice.visibility, 'draft');
        assert.strictEqual(created.notice.message, ' Attention à ce vendeur.');

        const authors = yield* sql<{ name: string; enabled: number }>`
        SELECT name, enabled FROM contributor
         WHERE email = 'camille@exemple.fr'
      `;
        assert.strictEqual(authors[0]?.name, 'Camille');
        assert.strictEqual(authors[0]?.enabled, 1);

        const contexts = yield* sql<{
          urlRegex: string;
          exampleUrl: string;
          description: string;
        }>`
        SELECT urlRegex, exampleUrl, description FROM matching_context
         WHERE notice_id = ${created.notice.id}
      `;
        assert.strictEqual(contexts[0]?.urlRegex, '/panier');
        assert.strictEqual(
          contexts[0]?.exampleUrl,
          'https://boutique.exemple.fr/panier?x=1',
        );
        assert.strictEqual(
          contexts[0]?.description,
          'Draft posted by Camille from the extension.',
        );

        const domains = yield* sql<{ name: string }>`
        SELECT dn.name FROM domain_name dn
          JOIN matching_context_domain_name mcdn ON mcdn.domain_name_id = dn.id
          JOIN matching_context mc ON mc.id = mcdn.matching_context_id
         WHERE mc.notice_id = ${created.notice.id}
      `;
        assert.strictEqual(domains[0]?.name, 'boutique.exemple.fr');
      }),
  );

  it.effect('attaches the contribution to an author already known', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;
      const writes = yield* V3Writes;

      const created = yield* writes.recordContribution({
        url: 'https://exemple.fr/a',
        contributorName: 'Nom ignoré',
        contributorEmail: 'essai@exemple.fr',
        message: 'Bonjour.',
        toContributorId: null,
        question: false,
      });

      assert.strictEqual(created.notice.contributorId, 1);

      const authors = yield* sql<{ n: number }>`
        SELECT COUNT(*) AS n FROM contributor
      `;
      assert.strictEqual(authors[0]?.n, 2, 'no contributor created twice');
    }),
  );

  it.effect(
    'reuses the parent domain exemple.fr rather than duplicate boutique.exemple.fr',
    () =>
      Effect.gen(function* () {
        yield* seed;
        const sql = yield* SqlClient.SqlClient;
        const writes = yield* V3Writes;

        yield* sql`
        INSERT INTO domain_name (id, name, aliases, created_at, updated_at)
             VALUES (500, 'exemple.fr', '', NOW(), NOW())
      `;

        const created = yield* writes.recordContribution({
          url: 'https://boutique.exemple.fr/b',
          contributorName: 'Camille',
          contributorEmail: 'camille@exemple.fr',
          message: 'Bonjour.',
          toContributorId: null,
          question: false,
        });

        const domains = yield* sql<{ id: number }>`
        SELECT dn.id FROM domain_name dn
          JOIN matching_context_domain_name mcdn ON mcdn.domain_name_id = dn.id
          JOIN matching_context mc ON mc.id = mcdn.matching_context_id
         WHERE mc.notice_id = ${created.notice.id}
      `;
        assert.strictEqual(domains[0]?.id, 500);
      }),
  );

  it.effect('records a question addressed to a contributor', () =>
    Effect.gen(function* () {
      yield* seed;
      const writes = yield* V3Writes;

      const created = yield* writes.recordContribution({
        url: 'https://exemple.fr/c',
        contributorName: 'Camille',
        contributorEmail: 'camille@exemple.fr',
        message: 'Est-ce fiable ?',
        toContributorId: 2,
        question: true,
      });

      assert.strictEqual(created.notice.visibility, 'question');
      assert.strictEqual(created.notice.contributorId, 2);
      assert.strictEqual(
        created.notice.message,
        'Question from Camille<camille@exemple.fr}>: Est-ce fiable ?',
        'the prefix keeps the typo of the PHP backend, stray brace included',
      );
    }),
  );

  it.effect('refuses a question addressed to someone unknown', () =>
    Effect.gen(function* () {
      yield* seed;
      const writes = yield* V3Writes;

      const failure = yield* writes
        .recordContribution({
          url: 'https://exemple.fr/d',
          contributorName: 'Camille',
          contributorEmail: 'camille@exemple.fr',
          message: 'Bonjour.',
          toContributorId: 9999,
          question: true,
        })
        .pipe(Effect.flip);

      assert.strictEqual(failure._tag, 'InvalidContribution');
    }),
  );

  it.effect('refuses an unreadable address', () =>
    Effect.gen(function* () {
      yield* seed;
      const writes = yield* V3Writes;

      const failure = yield* writes
        .recordContribution({
          url: 'pas une adresse',
          contributorName: 'Camille',
          contributorEmail: 'camille@exemple.fr',
          message: 'Bonjour.',
          toContributorId: null,
          question: false,
        })
        .pipe(Effect.flip);

      assert.strictEqual(failure._tag, 'InvalidContribution');
    }),
  );
});

const sent: Message[] = [];

const WritesWithCapturedEmail = V3WritesSqlLive.pipe(
  Layer.provide(
    Layer.succeed(
      Mailer,
      Mailer.of({
        send: (message) =>
          Effect.sync(() => {
            sent.push(message);
          }),
      }),
    ),
  ),
  Layer.provideMerge(V3ReadsSqlLive),
  Layer.provideMerge(DatabaseLive),
);

layer(WritesWithCapturedEmail)('contribution email', (it) => {
  beforeEach(() => {
    sent.length = 0;
  });

  it.effect(
    'goes from the address of the contributor to the one of the instance, which can answer them',
    () =>
      Effect.gen(function* () {
        yield* seed;
        const writes = yield* V3Writes;

        yield* writes.recordContribution({
          url: 'https://exemple.fr/e',
          contributorName: 'Camille',
          contributorEmail: 'camille@exemple.fr',
          message: 'Attention à ce vendeur.',
          toContributorId: null,
          question: false,
        });

        assert.strictEqual(sent.length, 1);
        assert.strictEqual(sent[0]?.from, 'camille@exemple.fr');
        assert.strictEqual(sent[0]?.replyTo, 'camille@exemple.fr');
        assert.strictEqual(sent[0]?.to, 'contribution@dismoi.io');
        assert.strictEqual(
          sent[0]?.subject,
          '[DisMoi] New contribution from Camille',
        );
      }),
  );

  it.effect('leads to the notice created in the administration', () =>
    Effect.gen(function* () {
      yield* seed;
      const writes = yield* V3Writes;

      const created = yield* writes.recordContribution({
        url: 'https://exemple.fr/f',
        contributorName: 'Camille',
        contributorEmail: 'camille@exemple.fr',
        message: 'Attention à ce vendeur.',
        toContributorId: null,
        question: false,
      });

      assert.include(
        sent[0]?.html ?? '',
        `<a href="https://www.dismoi.io/admin/notices/${created.notice.id}">Edit</a>`,
      );
    }),
  );

  it.effect('names the contributor a question is addressed to', () =>
    Effect.gen(function* () {
      yield* seed;
      const writes = yield* V3Writes;

      yield* writes.recordContribution({
        url: 'https://exemple.fr/g',
        contributorName: 'Camille',
        contributorEmail: 'camille@exemple.fr',
        message: 'Est-ce fiable ?',
        toContributorId: 2,
        question: true,
      });

      assert.strictEqual(sent[0]?.subject, '[DisMoi] New question to Autre');
    }),
  );
});
