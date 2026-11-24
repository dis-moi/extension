import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Effect } from 'effect';
import { Supervision } from '@dismoi/api/application/Supervision';
import { run } from '../../../../lib/effect';
import '../../admin.css';
import { Chrome } from '../../chrome';
import { RemoveButton } from '../../fields';
import { requireAccount } from '../../session';
import { deleteContributor } from './actions';
import { ContributorForm } from './form';

export const dynamic = 'force-dynamic';

export const generateMetadata = async ({
  params,
}: {
  readonly params: { readonly id: string };
}) => ({ title: `Contributeur ${params.id} — Admin DisMoi` });

const ContributorPage = async ({
  params,
}: {
  readonly params: { readonly id: string };
}) => {
  const account = await requireAccount();
  const id = Number(params.id);

  if (!Number.isInteger(id)) notFound();

  const { contributor, byCategory } = await run(
    Effect.gen(function* () {
      const supervision = yield* Supervision;

      const [contributor, byCategory] = yield* Effect.all([
        supervision.contributor(id),
        supervision.contributorsByCategory,
      ]);

      return { contributor, byCategory };
    }),
  );

  if (contributor === null) notFound();

  // The ones already in use, plus the ones this contributor alone carries:
  // otherwise saving the form would silently drop a category.
  const knownCategories = [
    ...new Set([
      ...byCategory.map((part) => part.category),
      ...contributor.categories,
    ]),
  ].sort((a, b) => a.localeCompare(b, 'fr'));

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

        <span className="admin-chip" aria-hidden="true">
          {contributor.name.slice(0, 2).toUpperCase()}
        </span>

        <h1>{contributor.name}</h1>

        <span
          className={`admin-state ${
            contributor.enabled ? 'admin-state-public' : 'admin-state-neutral'
          }`}
        >
          {contributor.enabled ? 'Actif' : 'Désactivé'}
        </span>

        <Link
          className="admin-button-secondary"
          href={`/admin/notices?tab=all&contributor=${contributor.id}`}
        >
          Ses notices
        </Link>
      </div>

      <ContributorForm
        contributor={contributor}
        knownCategories={knownCategories}
      />

      <section className="admin-card" style={{ marginTop: 20 }}>
        <h2>Supprimer</h2>
        <p className="admin-note">
          Emporte ses épingles, ses relais et ses abonnements. Un contributeur
          qui signe encore des notices ne se supprime pas : désactive-le, il
          disparaît des extensions sans rien perdre.
        </p>
        <RemoveButton
          id={contributor.id}
          action={deleteContributor}
          label="Supprimer ce contributeur"
          confirm={`Supprimer définitivement ${contributor.name} et ses abonnements ?`}
        />
      </section>
    </Chrome>
  );
};

export default ContributorPage;
