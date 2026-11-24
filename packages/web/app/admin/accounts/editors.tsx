'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import type { AccountRow } from '@dismoi/api/application/Administrators';
import { ROLES } from '@dismoi/api/domain/AccountSubmission';
import { Confirmation, Rejection, SubmitButton } from '../fields';
import type { SaveResult } from '../form';
import { createAccount, saveAccount, setPassword } from './actions';

// The former form showed the password as plain text, in a `type: text`
// field. Here it is a password field, it travels alone, and
// `yarn admin:password` still does the same job from a terminal.

const LABELS: Readonly<Record<string, string>> = {
  ROLE_USER: 'Utilisateur',
  ROLE_ADMIN: 'Administrateur',
  ROLE_SUPER_ADMIN: 'Super administrateur',
};

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

const Identity = ({
  account,
  withPassword,
}: {
  readonly account: AccountRow | null;
  readonly withPassword: boolean;
}) => {
  const [state, act] = useFormState(
    account === null ? createAccount : saveAccount,
    null,
  );
  const key = account === null ? 'new' : String(account.id);

  return (
    <form action={act}>
      {account !== null && <input type="hidden" name="id" value={account.id} />}

      <Feedback
        state={state}
        title="Le compte n’a pas été enregistré :"
        done="Compte enregistré."
      />

      <div className="admin-grid-2">
        <div>
          <label className="admin-label" htmlFor={`username-${key}`}>
            Identifiant
          </label>
          <input
            className="admin-field"
            id={`username-${key}`}
            name="username"
            type="text"
            autoComplete="off"
            defaultValue={account?.username ?? ''}
            required
          />
        </div>

        <div>
          <label className="admin-label" htmlFor={`email-${key}`}>
            Adresse électronique
          </label>
          <input
            className="admin-field"
            id={`email-${key}`}
            name="email"
            type="email"
            autoComplete="off"
            defaultValue={account?.email ?? ''}
            required
          />
        </div>
      </div>

      {withPassword && (
        <div style={{ marginTop: 12 }}>
          <label className="admin-label" htmlFor={`password-${key}`}>
            Mot de passe
          </label>
          <input
            className="admin-field"
            id={`password-${key}`}
            name="password"
            type="password"
            autoComplete="new-password"
            aria-describedby={`password-hint-${key}`}
            required
          />
          <p className="admin-hint" id={`password-hint-${key}`}>
            Douze caractères au moins.
          </p>
        </div>
      )}

      <fieldset className="admin-group" style={{ marginTop: 12 }}>
        <legend>Rôles</legend>
        {ROLES.map((role) => (
          <label
            key={role}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              marginTop: 4,
            }}
          >
            <input
              type="checkbox"
              name="roles"
              value={role}
              defaultChecked={(account?.roles ?? ['ROLE_ADMIN']).includes(role)}
            />
            <span className="admin-note">{LABELS[role] ?? role}</span>
          </label>
        ))}
      </fieldset>

      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          marginTop: 12,
        }}
      >
        <input
          type="checkbox"
          name="enabled"
          value="yes"
          defaultChecked={account?.enabled ?? true}
        />
        <span className="admin-note">Compte actif</span>
      </label>

      <div style={{ marginTop: 12 }}>
        <SubmitButton label="Enregistrer" pending="Enregistrement…" />
      </div>
    </form>
  );
};

const Password = ({ account }: { readonly account: AccountRow }) => {
  const [state, act] = useFormState(setPassword, null);

  return (
    <form action={act} style={{ marginTop: 18 }}>
      <input type="hidden" name="id" value={account.id} />

      <Feedback
        state={state}
        title="Le mot de passe n’a pas été posé :"
        done="Mot de passe posé."
      />

      <div className="admin-grid-2">
        <div>
          <label className="admin-label" htmlFor={`new-${account.id}`}>
            Nouveau mot de passe
          </label>
          <input
            className="admin-field"
            id={`new-${account.id}`}
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
        </div>

        <div>
          <label className="admin-label" htmlFor={`again-${account.id}`}>
            Confirmation
          </label>
          <input
            className="admin-field"
            id={`again-${account.id}`}
            name="confirmation"
            type="password"
            autoComplete="new-password"
            required
          />
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <SubmitButton label="Poser le mot de passe" pending="Pose…" />
      </div>
    </form>
  );
};

export const NewAccount = () => (
  <details>
    <summary style={{ cursor: 'pointer' }}>Créer un compte</summary>
    <div style={{ padding: '12px 0 4px' }}>
      <Identity account={null} withPassword />
    </div>
  </details>
);

export const EditAccount = ({ account }: { readonly account: AccountRow }) => (
  <details>
    <summary style={{ cursor: 'pointer' }}>{account.username}</summary>
    <div style={{ padding: '12px 0 4px' }}>
      <Identity account={account} withPassword={false} />
      <Password account={account} />
    </div>
  </details>
);
