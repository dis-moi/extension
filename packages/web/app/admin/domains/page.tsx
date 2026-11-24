import React from 'react';
import { unstable_cache } from 'next/cache';
import { Effect } from 'effect';
import { Supervision } from '@dismoi/api/application/Supervision';
import { run } from '../../../lib/effect';
import '../admin.css';
import { Chrome } from '../chrome';
import { number } from '../format';
import { type Parameters, textParameter } from '../query';
import { requireRole } from '../session';

export const metadata = { title: 'Domaines — Admin DisMoi' };
export const dynamic = 'force-dynamic';

const cachedSets = unstable_cache(
  async () =>
    run(
      Effect.gen(function* () {
        const supervision = yield* Supervision;
        return yield* supervision.domainsSets;
      }),
    ),
  ['admin', 'domains-sets'],
  { revalidate: 900 },
);

const DomainsPage = async ({
  searchParams,
}: {
  readonly searchParams: Parameters;
}) => {
  const account = await requireRole('ROLE_ADMIN');

  const search = textParameter(searchParams, 'q');
  const term = search.trim().toLowerCase();

  const sets = await cachedSets();

  const kept =
    term === ''
      ? sets
      : sets.filter(
          (set) =>
            set.name.toLowerCase().includes(term) ||
            set.domains.some((domain) => domain.toLowerCase().includes(term)),
        );

  const distinctDomains = new Set(sets.flatMap((set) => set.domains)).size;
  const servedContexts = sets.reduce((total, set) => total + set.contexts, 0);
  const unused = sets.filter((set) => set.contexts === 0).length;

  return (
    <Chrome account={account} active="domains">
      <div className="admin-title-row">
        <h1>Domaines</h1>
        <p className="admin-subtitle">
          <span className="num">{number(sets.length)}</span> jeux,{' '}
          <span className="num">{number(distinctDomains)}</span> domaines
          distincts.
        </p>
      </div>

      <div className="admin-grid-3" style={{ marginBottom: 20 }}>
        <div className="admin-card admin-tile">
          <h3>Ciblages servis</h3>
          <p className="admin-tile-value num">{number(servedContexts)}</p>
          <p className="admin-tile-detail">
            rattachements de contexte à un jeu
          </p>
        </div>

        <div className="admin-card admin-tile">
          <h3>Jeu le plus utilisé</h3>
          <p className="admin-tile-value num">
            {number(sets[0]?.contexts ?? 0)}
          </p>
          <p className="admin-tile-detail">{sets[0]?.name ?? '—'}</p>
        </div>

        <div className="admin-card admin-tile">
          <h3>Jeux inutilisés</h3>
          <p className="admin-tile-value num">{number(unused)}</p>
          <p className="admin-tile-detail">rattachés à aucun contexte</p>
        </div>
      </div>

      <form className="admin-filters" method="get" action="/admin/domains">
        <div style={{ flex: '1 1 320px', minWidth: 0 }}>
          <label className="admin-label" htmlFor="q">
            Rechercher
          </label>
          <input
            className="admin-field"
            id="q"
            name="q"
            type="search"
            defaultValue={search}
            placeholder="nom du jeu ou domaine"
          />
        </div>
        <button className="admin-button-secondary" type="submit">
          Filtrer
        </button>
      </form>

      <div className="admin-table-box">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <caption>
              Un jeu de domaines est partagé : le modifier modifie tous les
              ciblages qui s’y rattachent. La colonne « Ciblages » dit combien.
            </caption>

            <thead>
              <tr>
                <th scope="col">Jeu</th>
                <th scope="col">Domaines</th>
                <th scope="col" className="right">
                  Nombre
                </th>
                <th scope="col" className="right">
                  Ciblages
                </th>
              </tr>
            </thead>

            <tbody>
              {kept.map((set) => (
                <tr key={set.id}>
                  <td style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
                    {set.name}
                    <span
                      className="num"
                      style={{
                        display: 'block',
                        fontSize: 11,
                        fontWeight: 400,
                        color: 'var(--ink-soft)',
                      }}
                    >
                      #{set.id}
                    </span>
                  </td>

                  <td
                    className="admin-mono"
                    style={{
                      maxWidth: 520,
                      fontSize: 12,
                      color: 'var(--ink-soft)',
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {set.domains.join('  ·  ') || '— aucun domaine —'}
                  </td>

                  <td className="num right">{set.domains.length}</td>

                  <td
                    className="num right"
                    style={{
                      fontWeight: 600,
                      color: set.contexts === 0 ? 'var(--ink-soft)' : undefined,
                    }}
                  >
                    {number(set.contexts)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="admin-hint" style={{ marginTop: 14 }}>
        La modification des jeux n’est pas encore recâblée : seuls les ciblages
        propres à une notice se modifient, depuis sa fiche. Un jeu partagé comme
        « Amazon », rattaché à{' '}
        <span className="num">{number(sets[0]?.contexts ?? 0)}</span> ciblages,
        demande un écran qui montre d’abord ce qu’on casse.
      </p>
    </Chrome>
  );
};

export default DomainsPage;
