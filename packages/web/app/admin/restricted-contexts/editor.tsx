'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import type { RestrictedContextEntry } from '@dismoi/api/application/Catalogue';
import { Confirmation, Rejection, SubmitButton } from '../fields';
import type { SaveResult } from '../form';
import { deleteRestrictedContext, saveRestrictedContext } from './actions';

// regex_validator.js of the former administration checked the syntax as one
// typed. The same here, plus the answer to the only question that follows:
// does this pattern hold against an address.

const compiled = (pattern: string): RegExp | null => {
  try {
    return new RegExp(pattern);
  } catch {
    return null;
  }
};

const Trial = ({ pattern }: { readonly pattern: string }) => {
  const [url, setUrl] = useState('');
  const expression = compiled(pattern);

  const verdict =
    pattern === ''
      ? null
      : expression === null
        ? 'Motif invalide : il ne compile pas.'
        : url === ''
          ? null
          : expression.test(url)
            ? 'Cette adresse est couverte : aucune notice n’y apparaîtra.'
            : 'Cette adresse n’est pas couverte.';

  return (
    <div style={{ marginTop: 10 }}>
      <label className="admin-label" htmlFor={`trial-${pattern}`}>
        Adresse d’essai
      </label>
      <input
        className="admin-field admin-mono"
        id={`trial-${pattern}`}
        type="url"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="https://banque.exemple.fr/comptes"
      />
      {verdict !== null && (
        <p className="admin-hint" role="status">
          {verdict}
        </p>
      )}
    </div>
  );
};

const Fields = ({
  entry,
}: {
  readonly entry: RestrictedContextEntry | null;
}) => {
  const [state, act] = useFormState(saveRestrictedContext, null);
  const [pattern, setPattern] = useState(entry?.urlRegex ?? '');
  const key = entry === null ? 'new' : String(entry.id);

  return (
    <form action={act}>
      {entry !== null && <input type="hidden" name="id" value={entry.id} />}

      {state?.reasons !== undefined && state.reasons.length > 0 && (
        <Rejection
          title="Le contexte n’a pas été enregistré :"
          reasons={state.reasons}
        />
      )}
      {state?.saved === true && <Confirmation text="Contexte enregistré." />}

      <label className="admin-label" htmlFor={`pattern-${key}`}>
        Motif de l’adresse
      </label>
      <input
        className="admin-field admin-mono"
        id={`pattern-${key}`}
        name="urlRegex"
        type="text"
        value={pattern}
        onChange={(event) => setPattern(event.target.value)}
        placeholder="^https://.*\.banque\.fr/"
        required
      />

      <Trial pattern={pattern} />

      <div style={{ marginTop: 12 }}>
        <SubmitButton label="Enregistrer" pending="Enregistrement…" />
      </div>
    </form>
  );
};

const Removal = ({ entry }: { readonly entry: RestrictedContextEntry }) => {
  const [state, act] = useFormState(deleteRestrictedContext, null);

  return (
    <form action={act} style={{ marginTop: 12 }}>
      <input type="hidden" name="id" value={entry.id} />

      {state?.reasons !== undefined && state.reasons.length > 0 && (
        <Rejection title="Suppression refusée :" reasons={state.reasons} />
      )}

      <button
        className="admin-button-secondary"
        type="submit"
        onClick={(event) => {
          if (
            !window.confirm(
              `Supprimer ce contexte ? Les notices redeviendront visibles sur les adresses que « ${entry.urlRegex} » couvrait.`,
            )
          ) {
            event.preventDefault();
          }
        }}
      >
        Supprimer ce contexte
      </button>
    </form>
  );
};

export const RestrictedContexts = ({
  entries,
}: {
  readonly entries: ReadonlyArray<RestrictedContextEntry>;
}) => (
  <>
    <section className="admin-card" aria-labelledby="title-new">
      <h2 id="title-new">Interdire un contexte</h2>
      <p className="admin-note">
        Sur une adresse couverte, l’extension n’affiche aucune notice, de
        quelque contributeur que ce soit. La liste part à chaque
        rafraîchissement des extensions.
      </p>
      <Fields entry={null} />
    </section>

    <section
      className="admin-card"
      aria-labelledby="title-list"
      style={{ marginTop: 20 }}
    >
      <h2 id="title-list">Contextes interdits</h2>

      <table className="admin-table" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th scope="col">Motif</th>
            <th scope="col" className="right">
              Identifiant
            </th>
          </tr>
        </thead>

        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td
                className="admin-mono"
                style={{ overflowWrap: 'anywhere', maxWidth: 620 }}
              >
                <details>
                  <summary style={{ cursor: 'pointer' }}>
                    {entry.urlRegex}
                  </summary>
                  <div style={{ padding: '12px 0 4px' }}>
                    <Fields entry={entry} />
                    <Removal entry={entry} />
                  </div>
                </details>
              </td>
              <td className="num right">#{entry.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  </>
);
