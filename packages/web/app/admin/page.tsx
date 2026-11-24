import React from 'react';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import { Effect } from 'effect';
import { Supervision } from '@dismoi/api/application/Supervision';
import { run } from '../../lib/effect';
import './admin.css';
import { Chrome } from './chrome';
import { Curve, Sketch } from './charts';
import { category, since, excerpt, number } from './format';
import { address, integerParameter, type Parameters } from './query';
import { requireAccount } from './session';

export const metadata = { title: 'Activité — Admin DisMoi' };
export const dynamic = 'force-dynamic';

// A one-year default rather than three months: 2026 carries only 17,398
// ratings out of 11.6 million, and over 90 days the chart showed 74 flat days
// then a jump — which reads as a collapse when it is the edge of the data.
// Widening costs nothing, the table having no index on the timestamp: 90 and
// 365 days take the same 2.1 s.
const WINDOWS: ReadonlyArray<{
  readonly days: number;
  readonly label: string;
}> = [
  { days: 30, label: '30 jours' },
  { days: 90, label: '3 mois' },
  { days: 365, label: '1 an' },
  { days: 1095, label: '3 ans' },
];

const DEFAULT_WINDOW = 365;

const requestedWindow = (parameters: Parameters): number => {
  const requested = integerParameter(parameters, 'days', DEFAULT_WINDOW);

  // Only the offered windows are served: a free value would open an
  // arbitrary scan of 11.6 million rows from the URL.
  return WINDOWS.some((window) => window.days === requested)
    ? requested
    : DEFAULT_WINDOW;
};

// A quarter of an hour of cache: with no index on the timestamp, a 90-day
// window costs four seconds. Curves a quarter of an hour behind stay
// readable; four seconds of waiting does not. An index on rating(type,
// context_timestamp) would end it, but that is a separate decision on an
// 11.6-million-row table that is not ours.
const cachedSeries = unstable_cache(
  async (type: string, days: number) =>
    run(
      Effect.gen(function* () {
        const supervision = yield* Supervision;
        return yield* supervision.dailySeries(type, days);
      }),
    ),
  ['admin', 'daily-series'],
  { revalidate: 900 },
);

// Counting the active subscribers scans the 6.2 million rows of
// subscription, for want of an index on the dates: 955 ms. The counts and the
// queue stay out of the cache, since they must reflect the action just taken
// and cost less than sixty milliseconds.
const cachedVolumesAndRanking = unstable_cache(
  async () =>
    run(
      Effect.gen(function* () {
        const supervision = yield* Supervision;

        const [volumes, followed, byCategory] = yield* Effect.all([
          supervision.volumes,
          supervision.mostFollowedContributors(5),
          supervision.contributorsByCategory,
        ]);

        return { volumes, followed, byCategory };
      }),
    ),
  ['admin', 'volumes-and-ranking'],
  { revalidate: 900 },
);

const ActivityPage = async ({
  searchParams,
}: {
  readonly searchParams: Parameters;
}) => {
  const account = await requireAccount();
  const days = requestedWindow(searchParams);

  const [
    { counts, totals, queue },
    { volumes, followed, byCategory },
    badges,
    displays,
    unfolds,
    clicks,
  ] = await Promise.all([
    run(
      Effect.gen(function* () {
        const supervision = yield* Supervision;

        const [counts, totals, queue] = yield* Effect.all([
          supervision.counts,
          supervision.ratingTotals,
          supervision.pendingQueue(1),
        ]);

        return { counts, totals, queue };
      }),
    ),
    cachedVolumesAndRanking(),
    cachedSeries('badge', days),
    cachedSeries('display', days),
    cachedSeries('unfold', days),
    cachedSeries('outbound-click', days),
  ]);

  const pending = counts.byVisibility.draft + counts.byVisibility.question;
  const oldest = queue[0];

  const overTheWindow = (points: ReadonlyArray<{ value: number }>): number =>
    points.reduce((total, point) => total + point.value, 0);

  const smallCharts = [
    {
      name: 'Affichages de notice',
      total: totals.displays,
      points: displays,
      ratio: `1 pour ${(totals.badge / Math.max(totals.displays, 1)).toFixed(1)} badges`,
    },
    {
      name: 'Dépliements',
      total: totals.unfolds,
      points: unfolds,
      ratio: `${((totals.unfolds / Math.max(totals.displays, 1)) * 100).toFixed(1)} % des affichages`,
    },
    {
      name: 'Clics sortants',
      total: totals.outboundClicks,
      points: clicks,
      ratio: `${((totals.outboundClicks / Math.max(totals.unfolds, 1)) * 100).toFixed(1)} % des dépliements`,
    },
  ];

  const engagement = [
    { name: 'J’aime', value: totals.likes },
    { name: 'Masquages', value: totals.dismissals },
    { name: 'Je n’aime pas', value: totals.dislikes },
  ];
  const maxEngagement = Math.max(...engagement.map((e) => e.value), 1);
  const maxCategory = Math.max(...byCategory.map((r) => r.number), 1);

  return (
    <Chrome account={account} active="activity">
      {pending > 0 && (
        <section className="admin-banner" aria-labelledby="queue-title">
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="#9a6700"
            strokeWidth="1.7"
            style={{ flexShrink: 0 }}
          >
            <circle cx="10" cy="10" r="7.5" />
            <path d="M10 6.2v4.3l2.6 1.6" />
          </svg>

          <div style={{ flexGrow: 1, minWidth: 220 }}>
            <h2 id="queue-title">
              <span className="num">{number(pending)}</span> contributions
              attendent une validation
            </h2>
            <p>
              <span className="num">{number(counts.byVisibility.draft)}</span>{' '}
              brouillons postés depuis l’extension ·{' '}
              <span className="num">
                {number(counts.byVisibility.question)}
              </span>{' '}
              questions adressées à un contributeur.
              {oldest !== undefined &&
                ` La plus ancienne attend depuis ${since(oldest.created)}.`}
            </p>
          </div>

          <Link
            className="admin-button-attention"
            href="/admin/notices?tab=to-review"
          >
            Ouvrir la file
          </Link>
        </section>
      )}

      <div className="admin-title-row">
        <h1>Activité</h1>
        <p className="admin-subtitle">Ce que l’extension fait vraiment.</p>

        <nav className="admin-windows" aria-label="Fenêtre d’observation">
          {WINDOWS.map((window) => (
            <Link
              key={window.days}
              href={address('/admin', { days: String(window.days) })}
              aria-current={window.days === days ? 'true' : undefined}
            >
              {window.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="admin-grid-4" style={{ marginBottom: 16 }}>
        <div className="admin-card admin-tile">
          <h3>Notices publiques</h3>
          <p className="admin-tile-value num">
            {number(counts.byVisibility.public)}
          </p>
          <p className="admin-tile-detail">
            sur <span className="num">{number(counts.total)}</span> au total
          </p>
        </div>

        <div className="admin-card admin-tile">
          <h3>Contributeurs servis</h3>
          <p className="admin-tile-value num">
            {number(volumes.servedContributors)}
          </p>
          <p className="admin-tile-detail">avec au moins une notice publique</p>
        </div>

        <div className="admin-card admin-tile">
          <h3>Installations</h3>
          <p className="admin-tile-value num">{number(volumes.installs)}</p>
          <p className="admin-tile-detail">depuis l’origine</p>
        </div>

        <div className="admin-card admin-tile">
          <h3>Abonnements</h3>
          <p className="admin-tile-value num">
            {number(volumes.subscriptions)}
          </p>
          <p className="admin-tile-detail">couples extension – contributeur</p>
        </div>
      </div>

      <section
        className="admin-card"
        style={{ marginBottom: 16, paddingBottom: 14 }}
        aria-labelledby="badge-title"
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            gap: 14,
            marginBottom: 4,
          }}
        >
          <h2 id="badge-title" style={{ margin: 0, fontSize: 16 }}>
            Affichages du badge
          </h2>
          <p
            className="num"
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--accent)',
            }}
          >
            {number(overTheWindow(badges))} sur la période
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: 'var(--ink-soft)',
              flexGrow: 1,
            }}
          >
            <span className="num">{number(totals.badge)}</span> depuis
            l’origine. Courbes rafraîchies au plus toutes les quinze minutes.
          </p>
        </div>

        <Curve
          points={badges}
          description={`Affichages du badge par jour sur ${days} jours`}
        />
      </section>

      <div className="admin-grid-3" style={{ marginBottom: 16 }}>
        {smallCharts.map((chart) => (
          <section
            key={chart.name}
            className="admin-card"
            style={{ padding: '16px 18px 10px' }}
          >
            <h3
              style={{
                margin: '0 0 2px',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--ink-soft)',
              }}
            >
              {chart.name}
            </h3>
            <p
              className="num"
              style={{
                margin: '0 0 1px',
                fontSize: 24,
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {number(chart.total)}
            </p>
            <p
              style={{
                margin: '0 0 8px',
                fontSize: 12,
                color: 'var(--ink-soft)',
              }}
            >
              {chart.ratio}
            </p>
            <Sketch
              points={chart.points}
              description={`${chart.name} par jour`}
            />
          </section>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <section
          className="admin-card"
          style={{ flex: '1 1 380px', minWidth: 0 }}
          aria-labelledby="eng-title"
        >
          <h2 id="eng-title" style={{ margin: '0 0 4px', fontSize: 16 }}>
            Engagement
          </h2>
          <p
            style={{
              margin: '0 0 16px',
              fontSize: 13,
              color: 'var(--ink-soft)',
            }}
          >
            Les gestes volontaires, à comparer aux{' '}
            <span className="num">{number(totals.badge)}</span> affichages
            passifs. Ce sont des soldes : les retours en arrière sont déduits.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {engagement.map((measure) => (
              <div key={measure.name} className="admin-bar-row">
                <span
                  style={{ flex: '0 0 132px', fontSize: 13, fontWeight: 500 }}
                >
                  {measure.name}
                </span>
                <span className="admin-bar-track">
                  <span
                    className="admin-bar"
                    aria-hidden="true"
                    style={{
                      width: `${((measure.value / maxEngagement) * 100).toFixed(1)}%`,
                    }}
                  />
                </span>
                <span
                  className="num"
                  style={{
                    flex: '0 0 62px',
                    textAlign: 'right',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {number(measure.value)}
                </span>
              </div>
            ))}
          </div>

          <h3
            style={{
              margin: '22px 0 12px',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--ink-soft)',
            }}
          >
            Contributeurs servis par catégorie
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {byCategory.map((part) => (
              <div key={part.category} className="admin-bar-row">
                <span
                  style={{ flex: '0 0 132px', fontSize: 13, fontWeight: 500 }}
                >
                  {category(part.category)}
                </span>
                <span className="admin-bar-track">
                  <span
                    className="admin-bar"
                    aria-hidden="true"
                    style={{
                      width: `${((part.number / maxCategory) * 100).toFixed(1)}%`,
                    }}
                  />
                </span>
                <span
                  className="num"
                  style={{
                    flex: '0 0 62px',
                    textAlign: 'right',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {part.number}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          className="admin-card"
          style={{ flex: '1 1 380px', minWidth: 0 }}
          aria-labelledby="followed-title"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 12,
              marginBottom: 6,
            }}
          >
            <h2 id="followed-title" style={{ margin: 0, fontSize: 16 }}>
              Contributeurs les plus suivis
            </h2>
            <Link
              href="/admin/contributors"
              style={{ fontSize: 12, fontWeight: 500, marginLeft: 'auto' }}
            >
              Tous
            </Link>
          </div>
          <p
            style={{
              margin: '0 0 16px',
              fontSize: 13,
              color: 'var(--ink-soft)',
            }}
          >
            Abonnements créés ou confirmés depuis sept jours.
          </p>

          <ol
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 11,
            }}
          >
            {followed.map((contributor) => (
              <li
                key={contributor.id}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <span className="admin-chip" aria-hidden="true">
                  {contributor.name.slice(0, 2).toUpperCase()}
                </span>
                <span style={{ flexGrow: 1, minWidth: 0 }}>
                  <Link
                    href={`/admin/contributors?q=${encodeURIComponent(contributor.name)}`}
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: 'var(--ink)',
                    }}
                  >
                    {contributor.name}
                  </Link>
                  <span
                    style={{
                      display: 'block',
                      fontSize: 12,
                      color: 'var(--ink-soft)',
                    }}
                  >
                    <span className="num">
                      {number(contributor.publicNotices)}
                    </span>{' '}
                    notices ·{' '}
                    {contributor.categories.map(category).join(', ') || '—'}
                  </span>
                </span>
                <span
                  className="num"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--ink-soft)',
                  }}
                >
                  {number(contributor.activeSubscribers)}
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {oldest !== undefined && (
        <p
          style={{
            marginTop: 26,
            fontSize: 12,
            color: 'var(--ink-soft)',
          }}
        >
          Doyenne de la file : notice {oldest.id}, {excerpt(oldest.message, 90)}
        </p>
      )}
    </Chrome>
  );
};

export default ActivityPage;
