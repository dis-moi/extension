'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

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
