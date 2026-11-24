import type { SqlClient } from 'effect/sql';

// Subscription::isActive() of the PHP: a row counts while it was created or
// refreshed inside the window. The extension refreshes on every start, which
// is what makes a live installation countable.
export const ACTIVE_SUBSCRIPTION_DAYS = 7;

// Counting them scans 6.2 million rows, so the fragment is shared rather
// than rewritten per query, and joined only where the figure is shown.
export const activeSubscribersBy = (sql: SqlClient.SqlClient) =>
  sql.literal(`
    SELECT s.contributor_id, COUNT(s.extension_id) AS active
      FROM subscription s
     WHERE s.created >= DATE_SUB(NOW(), INTERVAL ${ACTIVE_SUBSCRIPTION_DAYS} DAY)
        OR s.updated >= DATE_SUB(NOW(), INTERVAL ${ACTIVE_SUBSCRIPTION_DAYS} DAY)
     GROUP BY s.contributor_id
  `);
