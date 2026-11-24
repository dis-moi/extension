import { Effect, Layer } from 'effect';
import { SqlClient } from 'effect/sql';
import {
  type EditableContext,
  type NoticeFilters,
  type DomainsSetRow,
  type ContributorRow,
  type NoticeRow,
  type EditableNotice,
  type PendingNotice,
  Supervision,
} from '../../application/Supervision';
import { VISIBILITIES, type Visibility } from '../../domain/NoticeVisibility';
import { containing } from './likePattern';

// The counters are read from the counted columns of notice, never by
// aggregating rating: 64 milliseconds against twelve seconds, for the same
// result. And nothing filters on visibility — the administration must see
// the drafts, the questions and the archives.
const ACTIVE_SUBSCRIPTION_DAYS = 7;

// An empty simple_array column would give [''] when split naively.
const simpleArray = (value: string | null): ReadonlyArray<string> =>
  value === null || value === '' ? [] : value.split(',');

export const SupervisionSqlLive = Layer.effect(
  Supervision,
  Effect.gen(function* () {
    const sql = yield* SqlClient.SqlClient;

    const activeSubscribers = sql.literal(`
      SELECT s.contributor_id, COUNT(s.extension_id) AS active
        FROM subscription s
       WHERE s.created >= DATE_SUB(NOW(), INTERVAL ${ACTIVE_SUBSCRIPTION_DAYS} DAY)
          OR s.updated >= DATE_SUB(NOW(), INTERVAL ${ACTIVE_SUBSCRIPTION_DAYS} DAY)
       GROUP BY s.contributor_id
    `);

    const tabCondition = (tab: NoticeFilters['tab']) => {
      switch (tab) {
        case 'to-review':
          return sql.literal("n.visibility IN ('draft', 'question')");
        case 'public':
          return sql.literal("n.visibility = 'public'");
        case 'expired':
          return sql.literal('n.expires IS NOT NULL AND n.expires <= NOW()');
        case 'archived':
          return sql.literal("n.visibility = 'archived'");
        case 'all':
          return sql.literal('1 = 1');
      }
    };

    // No default branch: the sort key is validated where the query string is
    // read, so a key added to SORT_KEYS has to be given an order here rather
    // than quietly falling back to the most recent ones.
    const sortOrder = (sort: NoticeFilters['sort']) => {
      switch (sort) {
        case 'displayed':
          return sql.literal('n.displayed_count DESC, n.id DESC');
        case 'unfolded':
          return sql.literal('n.unfolded_count DESC, n.id DESC');
        case 'expiration':
          return sql.literal('n.expires IS NULL, n.expires ASC, n.id DESC');
        case 'recent':
        case undefined:
          return sql.literal('n.created DESC, n.id DESC');
      }
    };

    return Supervision.of({
      counts: Effect.gen(function* () {
        const rows = yield* sql<{
          visibility: string;
          n: number;
        }>`SELECT visibility, COUNT(*) AS n FROM notice GROUP BY visibility`;

        const expirations = yield* sql<{
          expired: number;
          unpublished: number;
        }>`
          SELECT
            SUM(expires IS NOT NULL AND expires <= NOW()) AS expired,
            SUM(expires IS NOT NULL AND expires <= NOW()
                AND unpublished_on_expiration = 1) AS unpublished
          FROM notice
        `;

        const byVisibility = Object.fromEntries(
          VISIBILITIES.map((visibility) => [visibility, 0]),
        ) as { [V in Visibility]: number };

        let total = 0;
        for (const row of rows) {
          total += row.n;
          if (
            (VISIBILITIES as ReadonlyArray<string>).includes(row.visibility)
          ) {
            byVisibility[row.visibility as Visibility] = row.n;
          }
        }

        return {
          total,
          byVisibility,
          expired: Number(expirations[0]?.expired ?? 0),
          unpublishedOnExpiration: Number(expirations[0]?.unpublished ?? 0),
        };
      }).pipe(Effect.orDie),

      ratingTotals: Effect.gen(function* () {
        const rows = yield* sql<{
          badge: number;
          displays: number;
          unfolds: number;
          clicks: number;
          likes: number;
          dislikes: number;
          dismissals: number;
        }>`
          SELECT COALESCE(SUM(badged_count), 0) AS badge,
                 COALESCE(SUM(displayed_count), 0) AS displays,
                 COALESCE(SUM(unfolded_count), 0) AS unfolds,
                 COALESCE(SUM(clicked_count), 0) AS clicks,
                 COALESCE(SUM(liked_count), 0) AS likes,
                 COALESCE(SUM(disliked_count), 0) AS dislikes,
                 COALESCE(SUM(dismissed_count), 0) AS dismissals
            FROM notice
        `;

        const row = rows[0];
        return {
          badge: Number(row?.badge ?? 0),
          displays: Number(row?.displays ?? 0),
          unfolds: Number(row?.unfolds ?? 0),
          outboundClicks: Number(row?.clicks ?? 0),
          likes: Number(row?.likes ?? 0),
          dislikes: Number(row?.dislikes ?? 0),
          dismissals: Number(row?.dismissals ?? 0),
        };
      }).pipe(Effect.orDie),

      volumes: Effect.gen(function* () {
        const [installs, subscriptions, served, contexts] = yield* Effect.all([
          sql<{ n: number }>`SELECT COUNT(*) AS n FROM extension`,
          sql<{ n: number }>`SELECT COUNT(*) AS n FROM subscription`,
          sql<{ n: number }>`
              SELECT COUNT(*) AS n FROM contributor c
               WHERE c.enabled = 1
                 AND EXISTS (SELECT 1 FROM notice n
                              WHERE n.contributor_id = c.id
                                AND n.visibility = 'public')
            `,
          sql<{ n: number }>`SELECT COUNT(*) AS n FROM matching_context`,
        ]);

        return {
          installs: installs[0]?.n ?? 0,
          subscriptions: subscriptions[0]?.n ?? 0,
          servedContributors: served[0]?.n ?? 0,
          targetingContexts: contexts[0]?.n ?? 0,
        };
      }).pipe(Effect.orDie),

      dailySeries: Effect.fn('Supervision.dailySeries')(function* (
        type: string,
        days: number,
      ) {
        const rows = yield* sql<{ day: string; n: number }>`
          SELECT DATE_FORMAT(context_timestamp, '%Y-%m-%d') AS day,
                 COUNT(*) AS n
            FROM rating
           WHERE type = ${type}
             AND context_timestamp >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
           GROUP BY day
           ORDER BY day
        `;

        // Days with no rating are absent from the result; the series is
        // filled in so that the chart has no gaps.
        const byDay = new Map(rows.map((row) => [row.day, Number(row.n)]));
        const series: Array<{ day: string; value: number }> = [];
        const today = new Date();

        for (let i = days; i >= 0; i -= 1) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const day = date.toISOString().slice(0, 10);
          series.push({ day, value: byDay.get(day) ?? 0 });
        }

        return series;
      }, Effect.orDie),

      pendingQueue: Effect.fn('Supervision.pendingQueue')(function* (
        limit: number,
      ) {
        const rows = yield* sql<{
          id: number;
          visibility: string;
          message: string;
          created: string;
          contributor: string | null;
          email: string | null;
          url: string | null;
        }>`
          SELECT n.id, n.visibility, n.message, n.created,
                 c.name AS contributor, c.email,
                 (SELECT mc.exampleUrl FROM matching_context mc
                   WHERE mc.notice_id = n.id AND mc.exampleUrl IS NOT NULL
                   ORDER BY mc.id LIMIT 1) AS url
            FROM notice n
            LEFT JOIN contributor c ON c.id = n.contributor_id
           WHERE n.visibility IN ('draft', 'question')
           ORDER BY n.created ASC
           LIMIT ${limit}
        `;

        return rows.map(
          (row): PendingNotice => ({
            id: row.id,
            visibility: row.visibility as Visibility,
            message: row.message,
            created: row.created,
            contributor: row.contributor,
            contributorEmail: row.email,
            exampleUrl: row.url,
          }),
        );
      }, Effect.orDie),

      notices: Effect.fn('Supervision.notices')(function* (
        filters: NoticeFilters,
      ) {
        const tab = tabCondition(filters.tab);

        const term =
          filters.search === undefined || filters.search.trim() === ''
            ? null
            : containing(filters.search);

        const search =
          term === null
            ? sql.literal('1 = 1')
            : sql`(n.message LIKE ${term}
                   OR n.note LIKE ${term}
                   OR c.name LIKE ${term}
                   OR EXISTS (SELECT 1 FROM matching_context mc
                               WHERE mc.notice_id = n.id
                                 AND (mc.urlRegex LIKE ${term}
                                      OR mc.exampleUrl LIKE ${term}
                                      OR mc.description LIKE ${term})))`;

        const byContributor =
          filters.contributorId === undefined
            ? sql.literal('1 = 1')
            : sql`n.contributor_id = ${filters.contributorId}`;

        const byLocale =
          filters.locale === undefined || filters.locale === ''
            ? sql.literal('1 = 1')
            : sql`COALESCE(n.locale, c.locale) = ${filters.locale}`;

        const [rows, total] = yield* Effect.all([
          sql<{
            id: number;
            message: string;
            visibility: string;
            locale: string | null;
            contributor: string | null;
            contributor_id: number | null;
            displayed_count: number;
            unfolded_count: number;
            liked_count: number;
            expires: string | null;
            unpublished_on_expiration: number;
            created: string;
            updated: string;
            contexts: number;
          }>`
            SELECT n.id, n.message, n.visibility,
                   COALESCE(n.locale, c.locale) AS locale,
                   c.name AS contributor, n.contributor_id,
                   n.displayed_count, n.unfolded_count, n.liked_count,
                   n.expires, n.unpublished_on_expiration,
                   n.created, n.updated,
                   (SELECT COUNT(*) FROM matching_context mc
                     WHERE mc.notice_id = n.id) AS contexts
              FROM notice n
              LEFT JOIN contributor c ON c.id = n.contributor_id
             WHERE ${tab} AND ${search} AND ${byContributor}
               AND ${byLocale}
             ORDER BY ${sortOrder(filters.sort)}
             LIMIT ${filters.perPage}
            OFFSET ${(filters.page - 1) * filters.perPage}
          `,
          sql<{ n: number }>`
            SELECT COUNT(*) AS n
              FROM notice n
              LEFT JOIN contributor c ON c.id = n.contributor_id
             WHERE ${tab} AND ${search} AND ${byContributor}
               AND ${byLocale}
          `,
        ]);

        // The targeting shown is a preview: the domains of the first two or
        // three contexts, not the whole list.
        const identifiers = rows.map((row) => row.id);
        const domains =
          identifiers.length === 0
            ? []
            : yield* sql<{ notice_id: number; name: string }>`
                SELECT mc.notice_id, dn.name AS name
                  FROM matching_context mc
                  JOIN matching_context_domain_name mcdn
                    ON mcdn.matching_context_id = mc.id
                  JOIN domain_name dn ON dn.id = mcdn.domain_name_id
                 WHERE mc.notice_id IN ${sql.in(identifiers)}
                 ORDER BY mc.id, dn.name
              `;

        const byNotice = new Map<number, string[]>();
        for (const row of domains) {
          const names = byNotice.get(row.notice_id) ?? [];
          if (!names.includes(row.name)) names.push(row.name);
          byNotice.set(row.notice_id, names);
        }

        return {
          rows: rows.map(
            (row): NoticeRow => ({
              id: row.id,
              message: row.message,
              visibility: row.visibility as Visibility,
              locale: row.locale,
              contributor: row.contributor,
              contributorId: row.contributor_id,
              targeting: byNotice.get(row.id) ?? [],
              contextCount: Number(row.contexts),
              displays: row.displayed_count,
              unfolds: row.unfolded_count,
              likes: row.liked_count,
              expires: row.expires,
              unpublishedOnExpiration: row.unpublished_on_expiration === 1,
              created: row.created,
              updated: row.updated,
            }),
          ),
          total: total[0]?.n ?? 0,
        };
      }, Effect.orDie),

      notice: Effect.fn('Supervision.notice')(function* (id: number) {
        const rows = yield* sql<{
          id: number;
          message: string;
          note: string | null;
          visibility: string;
          locale: string | null;
          screenshot: string | null;
          excludeUrlRegex: string | null;
          expires: string | null;
          unpublished_on_expiration: number;
          created: string;
          updated: string;
          contributor_id: number | null;
          badged_count: number;
          displayed_count: number;
          unfolded_count: number;
          clicked_count: number;
          liked_count: number;
          disliked_count: number;
          dismissed_count: number;
        }>`
          SELECT n.id, n.message, n.note, n.visibility, n.locale, n.screenshot,
                 n.excludeUrlRegex, n.expires, n.unpublished_on_expiration,
                 n.created, n.updated, n.contributor_id,
                 n.badged_count, n.displayed_count, n.unfolded_count,
                 n.clicked_count, n.liked_count, n.disliked_count,
                 n.dismissed_count
            FROM notice n WHERE n.id = ${id}
        `;

        const row = rows[0];
        if (row === undefined) return null;

        const [relayers, contexts, domains, sets] = yield* Effect.all([
          sql<{ id: number; name: string }>`
            SELECT c.id, c.name AS name
              FROM relay r JOIN contributor c ON c.id = r.relayed_by_id
             WHERE r.notice_id = ${id} ORDER BY c.name
          `,
          sql<{
            id: number;
            description: string | null;
            exampleUrl: string | null;
            urlRegex: string;
            excludeUrlRegex: string | null;
            querySelector: string | null;
            xpath: string | null;
          }>`
            SELECT mc.id, mc.description, mc.exampleUrl, mc.urlRegex,
                   mc.excludeUrlRegex, mc.querySelector, mc.xpath
              FROM matching_context mc
             WHERE mc.notice_id = ${id} ORDER BY mc.id
          `,
          sql<{ matching_context_id: number; id: number; name: string }>`
            SELECT mcdn.matching_context_id, dn.id, dn.name AS name
              FROM matching_context mc
              JOIN matching_context_domain_name mcdn
                ON mcdn.matching_context_id = mc.id
              JOIN domain_name dn ON dn.id = mcdn.domain_name_id
             WHERE mc.notice_id = ${id} ORDER BY dn.name
          `,
          sql<{ matching_context_id: number; id: number; name: string }>`
            SELECT mcds.matching_context_id, ds.id, ds.name AS name
              FROM matching_context mc
              JOIN matching_context_domains_set mcds
                ON mcds.matching_context_id = mc.id
              JOIN domains_set ds ON ds.id = mcds.domains_set_id
             WHERE mc.notice_id = ${id} ORDER BY ds.name
          `,
        ]);

        const groupByContext = <T extends { matching_context_id: number }>(
          rows: ReadonlyArray<T>,
        ): Map<number, Array<{ id: number; name: string }>> => {
          const grouped = new Map<
            number,
            Array<{ id: number; name: string }>
          >();
          for (const row of rows as ReadonlyArray<
            T & { id: number; name: string }
          >) {
            const group = grouped.get(row.matching_context_id) ?? [];
            group.push({ id: row.id, name: row.name });
            grouped.set(row.matching_context_id, group);
          }
          return grouped;
        };

        const domainsByContext = groupByContext(domains);
        const setsByContext = groupByContext(sets);

        return {
          id: row.id,
          message: row.message,
          note: row.note,
          visibility: row.visibility as Visibility,
          locale: row.locale,
          screenshot: row.screenshot,
          excludeUrlRegex: row.excludeUrlRegex,
          expires: row.expires,
          unpublishedOnExpiration: row.unpublished_on_expiration === 1,
          created: row.created,
          updated: row.updated,
          contributorId: row.contributor_id,
          relayers: relayers.map((relayer) => ({
            id: relayer.id,
            name: relayer.name,
          })),
          contexts: contexts.map(
            (context): EditableContext => ({
              id: context.id,
              description: context.description,
              exampleUrl: context.exampleUrl,
              urlRegex: context.urlRegex,
              excludeUrlRegex: context.excludeUrlRegex,
              querySelector: context.querySelector,
              xpath: context.xpath,
              domains: domainsByContext.get(context.id) ?? [],
              domainsSets: setsByContext.get(context.id) ?? [],
            }),
          ),
          counters: {
            badge: row.badged_count,
            displays: row.displayed_count,
            unfolds: row.unfolded_count,
            outboundClicks: row.clicked_count,
            likes: row.liked_count,
            dislikes: row.disliked_count,
            dismissals: row.dismissed_count,
          },
        } satisfies EditableNotice;
      }, Effect.orDie),

      contributors: Effect.gen(function* () {
        const rows = yield* sql<{
          id: number;
          name: string;
          email: string | null;
          categories: string | null;
          locale: string | null;
          enabled: number;
          image: string | null;
          public: number;
          active: number | null;
          pinned: string | null;
        }>`
          SELECT c.id, c.name AS name, c.email, c.categories, c.locale,
                 c.enabled, c.image,
                 (SELECT COUNT(*) FROM notice n
                   WHERE n.contributor_id = c.id
                     AND n.visibility = 'public') AS public,
                 a.active,
                 (SELECT LEFT(n2.message, 90) FROM pin p
                    JOIN notice n2 ON n2.id = p.notice_id
                   WHERE p.contributor_id = c.id
                   ORDER BY p.sort LIMIT 1) AS pinned
            FROM contributor c
            LEFT JOIN (${activeSubscribers}) a ON a.contributor_id = c.id
           ORDER BY c.name
        `;

        return rows.map(
          (row): ContributorRow => ({
            id: row.id,
            name: row.name,
            email: row.email,
            categories: simpleArray(row.categories),
            locale: row.locale,
            enabled: row.enabled === 1,
            publicNotices: Number(row.public),
            activeSubscribers: Number(row.active ?? 0),
            pinnedNotice: row.pinned,
            avatar: row.image,
          }),
        );
      }).pipe(Effect.orDie),

      contributor: Effect.fn('SupervisionSql.contributor')(function* (
        id: number,
      ) {
        const rows = yield* sql<{
          id: number;
          name: string;
          title: string | null;
          email: string | null;
          site: string | null;
          intro: string | null;
          categories: string | null;
          locale: string | null;
          enabled: number;
          image: string | null;
          banner_image: string | null;
          preview_image: string | null;
          subscriptions: number | null;
          total: number;
          public: number;
        }>`
          SELECT c.id, c.name AS name, c.title AS title, c.email,
                 c.website AS site, c.intro, c.categories, c.locale,
                 c.enabled, c.image, c.banner_image, c.preview_image,
                 c.total_subscriptions AS subscriptions,
                 (SELECT COUNT(*) FROM notice n
                   WHERE n.contributor_id = c.id) AS total,
                 (SELECT COUNT(*) FROM notice n
                   WHERE n.contributor_id = c.id
                     AND n.visibility = 'public') AS public
            FROM contributor c
           WHERE c.id = ${id}
        `;

        const row = rows[0];
        if (row === undefined) return null;

        // The pins carry an order, and it is the one the profile page
        // follows: it is returned as is.
        const pinned = yield* sql<{ id: number; message: string }>`
          SELECT n.id, n.message
            FROM pin p
            JOIN notice n ON n.id = p.notice_id
           WHERE p.contributor_id = ${id}
           ORDER BY p.sort, p.notice_id
        `;

        return {
          id: row.id,
          name: row.name,
          title: row.title,
          email: row.email,
          website: row.site,
          intro: row.intro,
          locale: row.locale,
          categories: simpleArray(row.categories),
          enabled: row.enabled === 1,
          avatar: row.image,
          banner: row.banner_image,
          preview: row.preview_image,
          pinned: pinned.map((pin) => ({
            id: pin.id,
            message: pin.message,
          })),
          notices: {
            total: Number(row.total),
            public: Number(row.public),
          },
          totalSubscriptions: Number(row.subscriptions ?? 0),
        };
      }, Effect.orDie),

      domainsSets: Effect.gen(function* () {
        const rows = yield* sql<{
          id: number;
          name: string;
          domains: string | null;
          contexts: number;
        }>`
          SELECT ds.id, ds.name AS name,
                 (SELECT GROUP_CONCAT(dn.name ORDER BY dn.name SEPARATOR ',')
                    FROM domains_set_domain dsd
                    JOIN domain_name dn ON dn.id = dsd.domain_name_id
                   WHERE dsd.domains_set_id = ds.id) AS domains,
                 (SELECT COUNT(*) FROM matching_context_domains_set mcds
                   WHERE mcds.domains_set_id = ds.id) AS contexts
            FROM domains_set ds
           ORDER BY contexts DESC, ds.name
        `;

        return rows.map(
          (row): DomainsSetRow => ({
            id: row.id,
            name: row.name,
            domains:
              row.domains === null || row.domains === ''
                ? []
                : row.domains.split(','),
            contexts: Number(row.contexts),
          }),
        );
      }).pipe(Effect.orDie),

      contributorsForPicking: Effect.gen(function* () {
        const rows = yield* sql<{ id: number; name: string }>`
          SELECT c.id, c.name AS name FROM contributor c ORDER BY c.name
        `;
        return rows.map((row) => ({ id: row.id, name: row.name }));
      }).pipe(Effect.orDie),

      mostFollowedContributors: Effect.fn(
        'Supervision.mostFollowedContributors',
      )(function* (limit: number) {
        const rows = yield* sql<{
          id: number;
          name: string;
          categories: string | null;
          active: number | null;
          public: number;
        }>`
          SELECT c.id, c.name AS name, c.categories, a.active,
                 (SELECT COUNT(*) FROM notice n
                   WHERE n.contributor_id = c.id
                     AND n.visibility = 'public') AS public
            FROM contributor c
            JOIN (${activeSubscribers}) a ON a.contributor_id = c.id
           WHERE c.enabled = 1
           ORDER BY a.active DESC, c.name ASC
           LIMIT ${limit}
        `;

        return rows.map((row) => ({
          id: row.id,
          name: row.name,
          activeSubscribers: Number(row.active ?? 0),
          publicNotices: Number(row.public),
          categories: simpleArray(row.categories),
        }));
      }, Effect.orDie),

      contributorsByCategory: Effect.gen(function* () {
        // Categories are a `simple_array`: they are counted in memory
        // rather than by a query, because a contributor can carry several of
        // them in a single column.
        const rows = yield* sql<{ categories: string | null }>`
          SELECT c.categories FROM contributor c
           WHERE c.enabled = 1
             AND EXISTS (SELECT 1 FROM notice n
                          WHERE n.contributor_id = c.id
                            AND n.visibility = 'public')
        `;

        const counts = new Map<string, number>();
        for (const row of rows) {
          for (const category of simpleArray(row.categories)) {
            counts.set(category, (counts.get(category) ?? 0) + 1);
          }
        }

        return [...counts.entries()]
          .map(([category, number]) => ({ category, number }))
          .sort((a, b) => b.number - a.number);
      }).pipe(Effect.orDie),
    });
  }),
);
