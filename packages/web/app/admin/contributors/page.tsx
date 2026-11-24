import React from 'react';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import { Effect } from 'effect';
import { Supervision } from '@dismoi/api/application/Supervision';
import { run } from '../../../lib/effect';
import '../admin.css';
import { LanguageOptions } from '../fields';
import { Chrome } from '../chrome';
import { category, excerpt, number } from '../format';
import { parameter, type Parameters, textParameter } from '../query';
import { requireAccount } from '../session';

export const metadata = { title: 'Contributeurs — Admin DisMoi' };
export const dynamic = 'force-dynamic';

// Counting active subscribers scans the 6.2 million rows of subscription
// for want of an index on the dates: close to a second.
const cachedList = unstable_cache(
  async () =>
    run(
      Effect.gen(function* () {
        const supervision = yield* Supervision;

        const [contributors, byCategory] = yield* Effect.all([
          supervision.contributors,
          supervision.contributorsByCategory,
        ]);

        return { contributors, byCategory };
      }),
    ),
  ['admin', 'contributors'],
  { revalidate: 900 },
);

const ContributorsPage = async ({
  searchParams,
}: {
  readonly searchParams: Parameters;
}) => {
  const account = await requireAccount();

  const search = textParameter(searchParams, 'q').trim().toLowerCase();
  const categoryFilter = textParameter(searchParams, 'category');
  const localeFilter = textParameter(searchParams, 'locale');
  const stateFilter = textParameter(searchParams, 'state');

  const { contributors, byCategory } = await cachedList();

  const kept = contributors.filter((contributor) => {
    if (
      search !== '' &&
      !contributor.name.toLowerCase().includes(search) &&
      !(contributor.email ?? '').toLowerCase().includes(search)
    ) {
      return false;
    }
    if (
      categoryFilter !== '' &&
      !contributor.categories.includes(categoryFilter)
    ) {
      return false;
    }
    if (localeFilter !== '' && contributor.locale !== localeFilter) {
      return false;
    }
    if (stateFilter === 'served' && contributor.publicNotices === 0) {
      return false;
    }
    if (stateFilter === 'without-notice' && contributor.publicNotices > 0) {
      return false;
    }
    if (stateFilter === 'disabled' && contributor.enabled) return false;

    return true;
  });

  const served = contributors.filter(
    (contributor) => contributor.publicNotices > 0 && contributor.enabled,
  ).length;
  const withoutNotice = contributors.length - served;
  const maxCategory = Math.max(...byCategory.map((part) => part.number), 1);

  return (
    <Chrome account={account} active="contributors">
      <div className="admin-title-row">
        <h1>Contributeurs</h1>
        <p className="admin-subtitle">
          <span className="num">{number(contributors.length)}</span>{' '}
          enregistrés, <span className="num">{number(served)}</span> avec au
          moins une notice publique.
        </p>
      </div>

      <section
        className="admin-card"
        style={{ marginBottom: 20 }}
        aria-labelledby="title-categories"
      >
        <h2
          id="title-categories"
          style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600 }}
        >
          Répartition par catégorie
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {byCategory.map((part) => (
            <div key={part.category} className="admin-bar-row">
              <span
                style={{ flex: '0 0 150px', fontSize: 13, fontWeight: 500 }}
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
                  flex: '0 0 44px',
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

        <p className="admin-hint" style={{ marginTop: 12 }}>
          Parmi les <span className="num">{number(served)}</span> contributeurs
          servis. Un contributeur peut porter plusieurs catégories.
        </p>
      </section>

      <form className="admin-filters" method="get" action="/admin/contributors">
        <div style={{ flex: '1 1 260px', minWidth: 0 }}>
          <label className="admin-label" htmlFor="q">
            Rechercher
          </label>
          <input
            className="admin-field"
            id="q"
            name="q"
            type="search"
            defaultValue={parameter(searchParams, 'q') ?? ''}
            placeholder="nom ou adresse"
          />
        </div>

        <div style={{ flex: '0 1 200px' }}>
          <label className="admin-label" htmlFor="category">
            Catégorie
          </label>
          <select
            className="admin-field"
            id="category"
            name="category"
            defaultValue={categoryFilter}
          >
            <option value="">Toutes</option>
            {byCategory.map((part) => (
              <option key={part.category} value={part.category}>
                {category(part.category)}
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
            defaultValue={localeFilter}
          >
            <option value="">Toutes</option>
            <LanguageOptions />
          </select>
        </div>

        <div style={{ flex: '0 1 200px' }}>
          <label className="admin-label" htmlFor="state">
            État
          </label>
          <select
            className="admin-field"
            id="state"
            name="state"
            defaultValue={stateFilter}
          >
            <option value="">Tous ({contributors.length})</option>
            <option value="served">Servis ({served})</option>
            <option value="without-notice">
              Sans notice publique ({withoutNotice})
            </option>
            <option value="disabled">Désactivés</option>
          </select>
        </div>

        <button className="admin-button-secondary" type="submit">
          Filtrer
        </button>
      </form>

      <div className="admin-table-box">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <caption>
              <span className="num">{number(kept.length)}</span> ligne
              {kept.length > 1 ? 's' : ''}. « Abonnés actifs » compte les
              abonnements créés ou confirmés depuis sept jours — le même calcul
              que l’API.
            </caption>

            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Catégories</th>
                <th scope="col" className="right">
                  Notices
                </th>
                <th scope="col" className="right">
                  Abonnés actifs
                </th>
                <th scope="col">Épinglée</th>
                <th scope="col">Langue</th>
                <th scope="col">État</th>
              </tr>
            </thead>

            <tbody>
              {kept.map((contributor) => (
                <tr key={contributor.id}>
                  <td>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 11,
                      }}
                    >
                      <span className="admin-chip" aria-hidden="true">
                        {contributor.name.slice(0, 2).toUpperCase()}
                      </span>
                      <span style={{ minWidth: 0 }}>
                        <Link
                          href={`/admin/contributors/${contributor.id}`}
                          style={{
                            fontWeight: 500,
                            textDecoration: 'none',
                            color: 'var(--ink)',
                            display: 'block',
                          }}
                        >
                          {contributor.name}
                        </Link>
                        <span
                          style={{
                            fontSize: 11,
                            color: 'var(--ink-soft)',
                          }}
                        >
                          {contributor.email ?? '—'}
                        </span>
                      </span>
                    </span>
                  </td>

                  <td style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
                    {contributor.categories.map(category).join(', ') || '—'}
                  </td>

                  <td className="num right">
                    {number(contributor.publicNotices)}
                  </td>

                  <td className="num right" style={{ fontWeight: 600 }}>
                    {number(contributor.activeSubscribers)}
                  </td>

                  <td
                    style={{
                      maxWidth: 220,
                      fontSize: 12,
                      color: 'var(--ink-soft)',
                    }}
                  >
                    {contributor.pinnedNotice === null
                      ? '—'
                      : excerpt(contributor.pinnedNotice, 60)}
                  </td>

                  <td style={{ fontSize: 12 }}>{contributor.locale ?? '—'}</td>

                  <td>
                    <span
                      className={`admin-state ${
                        contributor.enabled
                          ? 'admin-state-public'
                          : 'admin-state-neutral'
                      }`}
                    >
                      {contributor.enabled ? 'Actif' : 'Désactivé'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Chrome>
  );
};

export default ContributorsPage;
