'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import type {
  DomainEntry,
  DomainsSetEntry,
} from '@dismoi/api/application/Catalogue';
import { prettyName } from '@dismoi/api/domain/CatalogueSubmission';
import { Confirmation, Rejection, SubmitButton } from '../fields';
import { number } from '../format';
import type { SaveResult } from '../form';
import {
  deleteDomain,
  deleteDomainsSet,
  saveDomain,
  saveDomainsSet,
} from './actions';

// Each row carries its own form, inside a disclosure: what a removal would
// break — the count of targeting contexts — stays next to the button that
// would do it.

type Action = (
  previous: SaveResult | null,
  form: FormData,
) => Promise<SaveResult>;

const Feedback = ({
  state,
  title,
  done,
}: {
  readonly state: SaveResult | null;
  readonly title: string;
  readonly done: string;
}) => (
  <>
    {state?.reasons !== undefined && state.reasons.length > 0 && (
      <Rejection title={title} reasons={state.reasons} />
    )}
    {state?.saved === true && <Confirmation text={done} />}
  </>
);

const Disclosure = ({
  summary,
  children,
}: {
  readonly summary: React.ReactNode;
  readonly children: React.ReactNode;
}) => (
  <details>
    <summary style={{ cursor: 'pointer' }}>{summary}</summary>
    <div style={{ padding: '12px 0 4px' }}>{children}</div>
  </details>
);

const Removal = ({
  id,
  action,
  label,
  confirm,
}: {
  readonly id: number;
  readonly action: Action;
  readonly label: string;
  readonly confirm: string;
}) => {
  const [state, act] = useFormState(action, null);

  return (
    <form action={act} style={{ marginTop: 12 }}>
      <input type="hidden" name="id" value={id} />
      <Feedback state={state} title="Suppression refusée :" done="Supprimé." />
      <button
        className="admin-button-secondary"
        type="submit"
        onClick={(event) => {
          if (!window.confirm(confirm)) event.preventDefault();
        }}
      >
        {label}
      </button>
    </form>
  );
};

const SetFields = ({
  set,
  action,
}: {
  readonly set: DomainsSetEntry | null;
  readonly action: Action;
}) => {
  const [state, act] = useFormState(action, null);
  const key = set === null ? 'new' : String(set.id);

  return (
    <form action={act}>
      {set !== null && <input type="hidden" name="id" value={set.id} />}

      <Feedback
        state={state}
        title="Le jeu n’a pas été enregistré :"
        done="Jeu enregistré."
      />

      <div className="admin-grid-2">
        <div>
          <label className="admin-label" htmlFor={`set-name-${key}`}>
            Nom du jeu
          </label>
          <input
            className="admin-field"
            id={`set-name-${key}`}
            name="name"
            type="text"
            defaultValue={set?.name ?? ''}
            required
          />
        </div>

        <div>
          <label className="admin-label" htmlFor={`set-domains-${key}`}>
            Domaines
          </label>
          <input
            className="admin-field admin-mono"
            id={`set-domains-${key}`}
            name="domains"
            type="text"
            defaultValue={(set?.domains ?? []).join(', ')}
            placeholder="amazon.fr, amazon.de"
            aria-describedby={`set-domains-hint-${key}`}
          />
          <p className="admin-hint" id={`set-domains-hint-${key}`}>
            Séparés par des virgules. Un domaine inconnu est créé.
          </p>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <SubmitButton label="Enregistrer" pending="Enregistrement…" />
      </div>
    </form>
  );
};

export const DomainsSets = ({
  sets,
}: {
  readonly sets: ReadonlyArray<DomainsSetEntry>;
}) => (
  <section className="admin-card" aria-labelledby="title-sets">
    <h2 id="title-sets">Jeux de domaines</h2>
    <p className="admin-note">
      Un jeu est partagé : le modifier modifie tous les ciblages qui s’y
      rattachent. La colonne Ciblages dit combien.
    </p>

    <Disclosure summary="Créer un jeu">
      <SetFields set={null} action={saveDomainsSet} />
    </Disclosure>

    <table className="admin-table" style={{ marginTop: 14 }}>
      <thead>
        <tr>
          <th scope="col">Jeu</th>
          <th scope="col">Domaines</th>
          <th scope="col" className="right">
            Ciblages
          </th>
        </tr>
      </thead>

      <tbody>
        {sets.map((set) => (
          <tr key={set.id}>
            <td style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
              <Disclosure summary={set.name}>
                <SetFields set={set} action={saveDomainsSet} />
                <Removal
                  id={set.id}
                  action={deleteDomainsSet}
                  label="Supprimer ce jeu"
                  confirm={`Supprimer le jeu « ${set.name} » ?`}
                />
              </Disclosure>
            </td>

            <td
              className="admin-mono"
              style={{
                maxWidth: 480,
                fontSize: 12,
                color: 'var(--ink-soft)',
                overflowWrap: 'anywhere',
              }}
            >
              {set.domains.join('  ·  ') || '— aucun domaine —'}
            </td>

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
  </section>
);

const DomainFields = ({
  domain,
  action,
}: {
  readonly domain: DomainEntry | null;
  readonly action: Action;
}) => {
  const [state, act] = useFormState(action, null);
  const key = domain === null ? 'new' : String(domain.id);

  return (
    <form action={act}>
      {domain !== null && <input type="hidden" name="id" value={domain.id} />}

      <Feedback
        state={state}
        title="Le domaine n’a pas été enregistré :"
        done="Domaine enregistré."
      />

      <div className="admin-grid-2">
        <div>
          <label className="admin-label" htmlFor={`domain-name-${key}`}>
            Nom
          </label>
          <input
            className="admin-field admin-mono"
            id={`domain-name-${key}`}
            name="name"
            type="text"
            defaultValue={domain?.name ?? ''}
            placeholder="exemple.fr"
            required
          />
        </div>

        <div>
          <label className="admin-label" htmlFor={`domain-path-${key}`}>
            Chemin
          </label>
          <input
            className="admin-field admin-mono"
            id={`domain-path-${key}`}
            name="path"
            type="text"
            defaultValue={domain?.path ?? ''}
            placeholder="/boutique"
            aria-describedby={`domain-path-hint-${key}`}
          />
          <p className="admin-hint" id={`domain-path-hint-${key}`}>
            Facultatif, commence par une barre oblique. Restreint le domaine à
            une partie du site.
          </p>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <label className="admin-label" htmlFor={`domain-aliases-${key}`}>
          Alias
        </label>
        <input
          className="admin-field admin-mono"
          id={`domain-aliases-${key}`}
          name="aliases"
          type="text"
          defaultValue={(domain?.aliases ?? []).join(', ')}
          placeholder="exemple.com, exemple.be"
          aria-describedby={`domain-aliases-hint-${key}`}
        />
        <p className="admin-hint" id={`domain-aliases-hint-${key}`}>
          Ciblés en même temps que le nom, sans avoir à dupliquer le ciblage.
        </p>
      </div>

      <div style={{ marginTop: 12 }}>
        <SubmitButton label="Enregistrer" pending="Enregistrement…" />
      </div>
    </form>
  );
};

export const Domains = ({
  domains: entries,
  total,
}: {
  readonly domains: ReadonlyArray<DomainEntry>;
  readonly total: number;
}) => (
  <section
    className="admin-card"
    aria-labelledby="title-domains"
    style={{ marginTop: 20 }}
  >
    <h2 id="title-domains">Domaines</h2>
    <p className="admin-note">
      <span className="num">{number(total)}</span> au catalogue. La recherche
      ci-dessus en montre au plus cent : un domaine se trouve, il ne se parcourt
      pas.
    </p>

    <Disclosure summary="Créer un domaine">
      <DomainFields domain={null} action={saveDomain} />
    </Disclosure>

    <table className="admin-table" style={{ marginTop: 14 }}>
      <thead>
        <tr>
          <th scope="col">Domaine</th>
          <th scope="col">Alias</th>
          <th scope="col">Jeux</th>
          <th scope="col" className="right">
            Ciblages
          </th>
        </tr>
      </thead>

      <tbody>
        {entries.map((domain) => (
          <tr key={domain.id}>
            <td
              className="admin-mono"
              style={{ fontWeight: 500, whiteSpace: 'nowrap' }}
            >
              <Disclosure summary={prettyName(domain.name, domain.path)}>
                <DomainFields domain={domain} action={saveDomain} />
                <Removal
                  id={domain.id}
                  action={deleteDomain}
                  label="Supprimer ce domaine"
                  confirm={`Supprimer le domaine « ${domain.name} » ?`}
                />
              </Disclosure>
            </td>

            <td
              className="admin-mono"
              style={{
                fontSize: 12,
                color: 'var(--ink-soft)',
                overflowWrap: 'anywhere',
              }}
            >
              {domain.aliases.join('  ·  ') || '—'}
            </td>

            <td style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
              {domain.sets.join(', ') || '—'}
            </td>

            <td
              className="num right"
              style={{
                fontWeight: 600,
                color: domain.contexts === 0 ? 'var(--ink-soft)' : undefined,
              }}
            >
              {number(domain.contexts)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);
