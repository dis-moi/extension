import React from 'react';
import Link from 'next/link';
import { Effect } from 'effect';
import { Supervision } from '@dismoi/api/application/Supervision';
import { run } from '../../../../lib/effect';
import '../../admin.css';
import { Chrome } from '../../chrome';
import { requireAccount } from '../../session';
import { ContributorForm } from '../[id]/form';

export const metadata = { title: 'Nouveau contributeur — Admin DisMoi' };
export const dynamic = 'force-dynamic';

const NewContributorPage = async () => {
  const account = await requireAccount();

  const categories = await run(
    Effect.gen(function* () {
      const supervision = yield* Supervision;
      const counted = yield* supervision.contributorsByCategory;
      return counted.map((entry) => entry.category);
    }),
  );

  return (
    <Chrome account={account} active="contributors">
      <div className="admin-title-row">
        <Link
          href="/admin/contributors"
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
          Contributeurs
        </Link>

        <h1>Nouveau contributeur</h1>
      </div>

      <ContributorForm contributor={null} knownCategories={categories} />
    </Chrome>
  );
};

export default NewContributorPage;
