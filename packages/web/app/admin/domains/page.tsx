import React from 'react';
import { Effect } from 'effect';
import { Catalogue } from '@dismoi/api/application/Catalogue';
import { run } from '../../../lib/effect';
import '../admin.css';
import { Chrome } from '../chrome';
import { number } from '../format';
import { type Parameters, textParameter } from '../query';
import { requireRole } from '../session';
import { Domains, DomainsSets } from './editors';

export const metadata = { title: 'Domaines — Admin DisMoi' };
export const dynamic = 'force-dynamic';

// The search is deliberately shared: a name typed once filters the sets and
// the domains at the same time, which is how one looks for "amazon" without
// knowing yet which of the two holds it.
const SHOWN = 100;

const DomainsPage = async ({
  searchParams,
}: {
  readonly searchParams: Parameters;
}) => {
  const account = await requireRole('ROLE_ADMIN');

  const search = textParameter(searchParams, 'q');
  const term = search.trim().toLowerCase();

  const { sets, domains, total } = await run(
    Effect.gen(function* () {
      const catalogue = yield* Catalogue;

      const [sets, domains, total] = yield* Effect.all([
        catalogue.domainsSets,
        catalogue.domains(term === '' ? null : term, SHOWN),
        catalogue.domainCount,
      ]);

      return { sets, domains, total };
    }),
  );

  const keptSets =
    term === ''
      ? sets
      : sets.filter(
          (set) =>
            set.name.toLowerCase().includes(term) ||
            set.domains.some((domain) => domain.toLowerCase().includes(term)),
        );

  const distinctDomains = new Set(sets.flatMap((set) => set.domains)).size;
  const servedContexts = sets.reduce((count, set) => count + set.contexts, 0);
  const unused = sets.filter((set) => set.contexts === 0).length;

  return (
    <Chrome account={account} active="domains">
      <div className="admin-title-row">
        <h1>Domaines</h1>
        <p className="admin-subtitle">
          <span className="num">{number(sets.length)}</span> jeux,{' '}
          <span className="num">{number(total)}</span> domaines au catalogue.
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
          <p className="admin-tile-detail">
            rattachés à aucun contexte, sur{' '}
            <span className="num">{number(distinctDomains)}</span> domaines
            groupés
          </p>
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
            placeholder="nom du jeu, domaine ou alias"
          />
        </div>
        <button className="admin-button-secondary" type="submit">
          Filtrer
        </button>
      </form>

      <DomainsSets sets={keptSets} />
      <Domains domains={domains} total={total} />
    </Chrome>
  );
};

export default DomainsPage;
