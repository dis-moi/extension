import { Effect, Layer } from 'effect';
import { SqlClient } from 'effect/sql';
import { Activity } from '../../application/Activity';
import { activeSubscribersBy } from './activeSubscribers';
import { simpleArray } from './simpleArray';

export const ActivitySqlLive = Layer.effect(
  Activity,
  Effect.gen(function* () {
    const sql = yield* SqlClient.SqlClient;
    const activeSubscribers = activeSubscribersBy(sql);

    return Activity.of({
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

      dailySeries: Effect.fn('Activity.dailySeries')(function* (
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

      mostFollowedContributors: Effect.fn('Activity.mostFollowedContributors')(
        function* (limit: number) {
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
        },
        Effect.orDie,
      ),
    });
  }),
);
