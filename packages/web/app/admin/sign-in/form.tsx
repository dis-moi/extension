'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { signIn } from './actions';

// useFormState and useFormStatus come from react-dom: the repository is on
// React 18, where useActionState does not exist yet.

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="admin-button"
      type="submit"
      disabled={pending}
      style={{ width: '100%' }}
    >
      {pending ? 'Vérification…' : 'Se connecter'}
    </button>
  );
};

export const SignInForm = () => {
  const [state, act] = useFormState(signIn, null);

  return (
    <form action={act}>
      {state?.error !== undefined && (
        <p className="admin-error" role="alert">
          {state.error}
        </p>
      )}

      <div style={{ marginBottom: 14 }}>
        <label className="admin-label" htmlFor="login">
          Identifiant ou adresse
        </label>
        <input
          className="admin-field"
          id="login"
          name="login"
          type="text"
          autoComplete="username"
          // This page holds nothing but this form, and this is its first
          // field: nothing else loses the focus.
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          required
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label className="admin-label" htmlFor="password">
          Mot de passe
        </label>
        <input
          className="admin-field"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      <SubmitButton />
    </form>
  );
};
