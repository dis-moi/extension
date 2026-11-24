import React from 'react';
import Link from 'next/link';
import { Effect } from 'effect';
import type { SortKey, Tab } from '@dismoi/api/application/Supervision';
import {
  isSortKey,
  isTab,
  Supervision,
} from '@dismoi/api/application/Supervision';
import { run } from '../../../lib/effect';
import '../admin.css';
import { setVisibility } from '../actions';
import { LanguageOptions } from '../fields';
import { Chrome } from '../chrome';
import { since, state, excerpt, number } from '../format';
import {
  address,
  integerParameter,
  parameter,
  type Parameters,
} from '../query';
import { requireAccount } from '../session';

export const metadata = { title: 'Notices — Admin DisMoi' };
export const dynamic = 'force-dynamic';

const PER_PAGE = 50;

const TAB_LABELS: ReadonlyArray<{
  readonly key: Tab;
  readonly label: string;
  readonly attention?: boolean;
}> = [
  { key: 'to-review', label: 'À valider', attention: true },
  { key: 'all', label: 'Toutes' },
  { key: 'public', label: 'Publiques' },
  { key: 'expired', label: 'Date dépassée' },
  { key: 'archived', label: 'Archivées' },
];

const SORT_OPTIONS: ReadonlyArray<{
  readonly key: SortKey;
  readonly label: string;
}> = [
  { key: 'recent', label: 'Plus récentes' },
  { key: 'displayed', label: 'Plus affichées' },
  { key: 'unfolded', label: 'Plus dépliées' },
  { key: 'expiration', label: 'Expiration proche' },
];

const NoticesPage = async ({
  searchParams,
}: {
  readonly searchParams: Parameters;
}) => {
  const account = await requireAccount();

  const requestedTab = parameter(searchParams, 'tab');
  const tab: Tab = isTab(requestedTab) ? requestedTab : 'to-review';

  const search = parameter(searchParams, 'q');
  const contributor = parameter(searchParams, 'contributor');
  const locale = parameter(searchParams, 'locale');

  const requestedSort = parameter(searchParams, 'sort');
  const sort = isSortKey(requestedSort) ? requestedSort : undefined;
  const page = integerParameter(searchParams, 'page', 1);

  const parameters = {
    tab,
    q: search,
    contributor,
    locale,
    sort,
  };

  const link = (changes: Record<string, string | undefined>) =>
    address('/admin/notices', parameters, changes);

  const { counts, result, choices } = await run(
    Effect.gen(function* () {
      const supervision = yield* Supervision;

      const [counts, result, choices] = yield* Effect.all([
        supervision.counts,
        supervision.notices({
          tab,
          ...(search === undefined ? {} : { search }),
          ...(contributor === undefined || contributor === ''
            ? {}
            : { contributorId: Number(contributor) }),
          ...(locale === undefined ? {} : { locale }),
          ...(sort === undefined ? {} : { sort }),
          page,
          perPage: PER_PAGE,
        }),
        supervision.contributorsForPicking,
      ]);

      return { counts, result, choices };
    }),
  );

  const tabCounts: Record<Tab, number> = {
    'to-review': counts.byVisibility.draft + counts.byVisibility.question,
    all: counts.total,
    public: counts.byVisibility.public,
    expired: counts.expired,
    archived: counts.byVisibility.archived,
  };

  const first = (page - 1) * PER_PAGE + 1;
  const last = Math.min(page * PER_PAGE, result.total);

  return (
    <Chrome account={account} active="notices">
      <div className="admin-title-row">
        <h1>Notices</h1>
        <p className="admin-subtitle">
          <span className="num">{number(counts.total)}</span> au total.
        </p>
        <Link className="admin-button" href="/admin/notices/new">
          Nouvelle notice
        </Link>
      </div>

      <nav className="admin-tabs" aria-label="État des notices">
        {TAB_LABELS.map((entry) => (
          <Link
            key={entry.key}
            href={link({ tab: entry.key, page: undefined })}
            aria-current={entry.key === tab ? 'page' : undefined}
          >
            {entry.label}
            <span
              className={`admin-pill num${
                entry.attention === true && tabCounts[entry.key] > 0
                  ? ' admin-pill-attention'
                  : ''
              }`}
            >
              {number(tabCounts[entry.key])}
            </span>
          </Link>
        ))}
      </nav>

      <form className="admin-filters" method="get" action="/admin/notices">
        <input type="hidden" name="tab" value={tab} />

        <div style={{ flex: '1 1 280px', minWidth: 0 }}>
          <label className="admin-label" htmlFor="q">
            Rechercher
          </label>
          <input
            className="admin-field"
            id="q"
            name="q"
            type="search"
            defaultValue={search ?? ''}
            placeholder="message, note, motif, URL d’exemple, contributeur…"
          />
        </div>

        <div style={{ flex: '0 1 200px' }}>
          <label className="admin-label" htmlFor="contributor">
            Contributeur
          </label>
          <select
            className="admin-field"
            id="contributor"
            name="contributor"
            defaultValue={contributor ?? ''}
          >
            <option value="">Tous ({choices.length})</option>
            {choices.map((option) => (
              <option key={option.id} value={String(option.id)}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: '0 1 150px' }}>
          <label className="admin-label" htmlFor="locale">
            Langue
          </label>
          <select
            className="admin-field"
            id="locale"
            name="locale"
            defaultValue={locale ?? ''}
          >
            <option value="">Toutes</option>
            <LanguageOptions />
          </select>
        </div>

        <div style={{ flex: '0 1 170px' }}>
          <label className="admin-label" htmlFor="sort">
            Trier par
          </label>
          <select
            className="admin-field"
            id="sort"
            name="sort"
            defaultValue={sort ?? 'recent'}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button className="admin-button-secondary" type="submit">
          Filtrer
        </button>
      </form>

      {tab === 'to-review' ? (
        <ReviewQueue rows={result.rows} />
      ) : (
        <NoticesTable rows={result.rows} tab={tab} />
      )}

      {result.total > PER_PAGE && (
        <div
          className="admin-pagination"
          style={{
            border: '1px solid var(--border)',
            borderRadius: 12,
            marginTop: 16,
          }}
        >
          <p>
            Lignes <span className="num">{number(first)}</span>–
            <span className="num">{number(last)}</span> sur{' '}
            <span className="num">{number(result.total)}</span>
          </p>

          {page > 1 ? (
            <Link
              className="admin-button-secondary"
              href={link({ page: String(page - 1) })}
            >
              Précédent
            </Link>
          ) : (
            <button className="admin-button-secondary" type="button" disabled>
              Précédent
            </button>
          )}

          {last < result.total ? (
            <Link
              className="admin-button-secondary"
              href={link({ page: String(page + 1) })}
            >
              Suivant
            </Link>
          ) : (
            <button className="admin-button-secondary" type="button" disabled>
              Suivant
            </button>
          )}
        </div>
      )}
    </Chrome>
  );
};

// Cards and not a table: reviewing a contribution means reading its whole
// message and seeing the page it targets.
const ReviewQueue = ({
  rows,
}: {
  readonly rows: ReadonlyArray<{
    readonly id: number;
    readonly message: string;
    readonly visibility: string;
    readonly contributor: string | null;
    readonly created: string;
    readonly targeting: ReadonlyArray<string>;
  }>;
}) => {
  if (rows.length === 0) {
    return (
      <div className="admin-card">
        <p style={{ margin: 0, fontSize: 14 }}>
          La file est vide. Rien n’attend de relecture.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {rows.map((row) => {
        const badge = state(row.visibility);

        return (
          <article
            key={row.id}
            className="admin-card"
            style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}
          >
            <div style={{ flex: '1 1 420px', minWidth: 0 }}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 9,
                  marginBottom: 10,
                }}
              >
                <span className={`admin-state ${badge.className}`}>
                  {badge.label}
                </span>
                <span className="num admin-note">#{row.id}</span>
                <span className="admin-note">reçue {since(row.created)}</span>
              </div>

              <blockquote
                style={{
                  margin: '0 0 12px',
                  padding: '13px 15px',
                  background: 'var(--background)',
                  borderRadius: 9,
                  fontSize: 14,
                  lineHeight: 1.55,
                }}
              >
                {excerpt(row.message, 600)}
              </blockquote>

              <dl
                style={{
                  margin: 0,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: '9px 18px',
                }}
              >
                <div>
                  <dt
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--ink-soft)',
                      marginBottom: 2,
                    }}
                  >
                    Contributeur
                  </dt>
                  <dd style={{ margin: 0, fontSize: 13 }}>
                    {row.contributor ?? '— aucun —'}
                  </dd>
                </div>
                <div>
                  <dt
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--ink-soft)',
                      marginBottom: 2,
                    }}
                  >
                    Ciblage
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      fontSize: 13,
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {row.targeting.join(', ') || '— aucun domaine —'}
                  </dd>
                </div>
              </dl>
            </div>

            <div
              style={{
                flex: '0 0 196px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <form action={setVisibility}>
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="visibility" value="public" />
                <button
                  className="admin-button"
                  type="submit"
                  style={{ width: '100%' }}
                >
                  Publier
                </button>
              </form>

              <Link
                className="admin-button-secondary"
                href={`/admin/notices/${row.id}`}
                style={{ width: '100%' }}
              >
                Corriger d’abord
              </Link>

              <form action={setVisibility}>
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="visibility" value="archived" />
                <button
                  className="admin-button-secondary"
                  type="submit"
                  style={{ width: '100%' }}
                >
                  Archiver
                </button>
              </form>
            </div>
          </article>
        );
      })}
    </div>
  );
};

const NoticesTable = ({
  rows,
  tab,
}: {
  readonly rows: ReadonlyArray<{
    readonly id: number;
    readonly message: string;
    readonly visibility: string;
    readonly locale: string | null;
    readonly contributor: string | null;
    readonly targeting: ReadonlyArray<string>;
    readonly contextCount: number;
    readonly displays: number;
    readonly unfolds: number;
    readonly likes: number;
    readonly expires: string | null;
    readonly unpublishedOnExpiration: boolean;
  }>;
  readonly tab: Tab;
}) => (
  <div className="admin-table-box">
    <div className="admin-table-scroll">
      <table className="admin-table">
        <caption>
          {tab === 'expired'
            ? 'Attention : une date dépassée n’arrête pas l’affichage. Seules les notices portant « retirer à l’expiration » cessent d’être servies.'
            : tab === 'archived'
              ? 'Les notices archivées ne sont plus servies par l’API, mais rien n’est supprimé.'
              : 'Les compteurs viennent des colonnes dénombrées de la notice.'}
        </caption>

        <thead>
          <tr>
            <th scope="col">Message</th>
            <th scope="col">Contributeur</th>
            <th scope="col">Ciblage</th>
            <th scope="col" className="right">
              Affichages
            </th>
            <th scope="col" className="right">
              Dépliés
            </th>
            <th scope="col" className="right">
              J’aime
            </th>
            <th scope="col">Expire</th>
            <th scope="col">État</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => {
            const badge = state(row.visibility);

            return (
              <tr key={row.id}>
                <td style={{ maxWidth: 330 }}>
                  <Link
                    href={`/admin/notices/${row.id}`}
                    style={{
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: 'var(--ink)',
                      display: 'block',
                      marginBottom: 3,
                    }}
                  >
                    {excerpt(row.message, 110)}
                  </Link>
                  <span className="num admin-note-small">
                    #{row.id} · {row.locale ?? '—'}
                  </span>
                </td>

                <td style={{ whiteSpace: 'nowrap' }}>
                  {row.contributor ?? '—'}
                </td>

                <td
                  style={{
                    maxWidth: 190,
                    overflowWrap: 'anywhere',
                    fontSize: 12,
                    color: 'var(--ink-soft)',
                  }}
                >
                  {row.targeting.slice(0, 3).join(', ') || '—'}
                  {row.contextCount > 1 && (
                    <span className="num"> · {row.contextCount} contextes</span>
                  )}
                </td>

                <td className="num right">{number(row.displays)}</td>
                <td className="num right">{number(row.unfolds)}</td>
                <td className="num right">{number(row.likes)}</td>

                <td
                  style={{
                    whiteSpace: 'nowrap',
                    fontSize: 12,
                    color: 'var(--ink-soft)',
                  }}
                >
                  {row.expires === null
                    ? '—'
                    : `${since(row.expires)}${row.unpublishedOnExpiration ? ' · retirée' : ''}`}
                </td>

                <td>
                  <span className={`admin-state ${badge.className}`}>
                    {badge.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default NoticesPage;
