import React from 'react';
import { Effect } from 'effect';
import { Catalogue } from '@dismoi/api/application/Catalogue';
import { run } from '../../../lib/effect';
import '../admin.css';
import { Chrome } from '../chrome';
import { number } from '../format';
import { requireRole } from '../session';
import { RestrictedContexts } from './editor';

export const metadata = { title: 'Contextes interdits — Admin DisMoi' };
export const dynamic = 'force-dynamic';

const RestrictedContextsPage = async () => {
  const account = await requireRole('ROLE_ADMIN');

  const entries = await run(
    Effect.gen(function* () {
      const catalogue = yield* Catalogue;
      return yield* catalogue.restrictedContexts;
    }),
  );

  return (
    <Chrome account={account} active="restricted">
      <div className="admin-title-row">
        <h1>Contextes interdits</h1>
        <p className="admin-subtitle">
          <span className="num">{number(entries.length)}</span> motifs où aucune
          notice ne s’affiche.
        </p>
      </div>

      <RestrictedContexts entries={entries} />
    </Chrome>
  );
};

export default RestrictedContextsPage;
