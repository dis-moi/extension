'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';

// SUPPORTED_LOCALES of the API. Breton is not decorative: notices really
// carry it.
export const LANGUAGES: ReadonlyArray<{
  readonly code: string;
  readonly name: string;
}> = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'br', name: 'Brezhoneg' },
];

export const LanguageOptions = () => (
  <>
    {LANGUAGES.map((language) => (
      <option key={language.code} value={language.code}>
        {language.name}
      </option>
    ))}
  </>
);

// useFormStatus only fills pending for a component inside the form: hence a
// component of its own rather than a state lifted up.
export const SubmitButton = ({
  label,
  pending: pendingLabel,
  fullWidth = false,
}: {
  readonly label: string;
  readonly pending: string;
  readonly fullWidth?: boolean;
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      className="admin-button"
      type="submit"
      disabled={pending}
      style={fullWidth ? { width: '100%' } : undefined}
    >
      {pending ? pendingLabel : label}
    </button>
  );
};

export const Rejection = ({
  title,
  reasons,
}: {
  readonly title: string;
  readonly reasons: ReadonlyArray<string>;
}) => (
  <div className="admin-error" role="alert" style={{ marginBottom: 18 }}>
    <strong>{title}</strong>
    <ul style={{ margin: '6px 0 0', paddingLeft: 20 }}>
      {reasons.map((reason) => (
        <li key={reason}>{reason}</li>
      ))}
    </ul>
  </div>
);

export const Confirmation = ({ text }: { readonly text: string }) => (
  <p className="admin-confirmation" role="status">
    {text}
  </p>
);

// A removal is a form of its own, with its own feedback: the reasons that
// hold it back — a pin, a notice still signed, a targeting context — have
// nothing to do with the fields of the object being edited.
export const RemoveButton = ({
  id,
  action,
  label,
  confirm,
}: {
  readonly id: number;
  readonly action: (
    previous: { readonly reasons?: ReadonlyArray<string> } | null,
    form: FormData,
  ) => Promise<{ readonly reasons?: ReadonlyArray<string> }>;
  readonly label: string;
  readonly confirm: string;
}) => {
  const [state, act] = useFormState(action, null);

  return (
    <form action={act} style={{ marginTop: 12 }}>
      <input type="hidden" name="id" value={id} />

      {state?.reasons !== undefined && state.reasons.length > 0 && (
        <Rejection title="Suppression refusée :" reasons={state.reasons} />
      )}

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
