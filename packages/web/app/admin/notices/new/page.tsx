import React from 'react';
import Link from 'next/link';
import { Effect } from 'effect';
import { Catalogue } from '@dismoi/api/application/Catalogue';
import { Supervision } from '@dismoi/api/application/Supervision';
import { run } from '../../../../lib/effect';
import '../../admin.css';
import { Chrome } from '../../chrome';
import { requireAccount } from '../../session';
import { NoticeForm } from '../[id]/form';

export const metadata = { title: 'Nouvelle notice — Admin DisMoi' };
export const dynamic = 'force-dynamic';

// A static segment, so it wins over [id] and `new` never reaches the editor
// as an identifier.
const NewNoticePage = async () => {
  const account = await requireAccount();

  const { contributors, sets } = await run(
    Effect.gen(function* () {
      const supervision = yield* Supervision;
      const catalogue = yield* Catalogue;

      const [contributors, sets] = yield* Effect.all([
        supervision.contributorsForPicking,
        catalogue.domainsSets,
      ]);

      return { contributors, sets };
    }),
  );

  return (
    <Chrome account={account} active="notices">
      <div className="admin-title-row">
        <Link
          href="/admin/notices"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M8.5 3L4.5 7l4 4" />
          </svg>
          Notices
        </Link>

        <h1>Nouvelle notice</h1>

        <p className="admin-subtitle">
          Créée en brouillon : rien ne part aux extensions avant la publication.
        </p>
      </div>

      <NoticeForm
        notice={null}
        contributors={contributors}
        sets={sets.map((set) => ({ id: set.id, name: set.name }))}
      />
    </Chrome>
  );
};

export default NewNoticePage;
