import React from 'react';

// /admin has no parent layout, the public site living under app/[locale]:
// this one is therefore the document itself. lang is French and stays so,
// failing which a screen reader would pronounce it by the rules of another
// language.

export const metadata = {
  title: 'Administration — DisMoi',
  description: 'Suivi de l’activité, modération des notices, contributors.',
  // Administration pages have no business in a search index.
  robots: { index: false, follow: false },
};

const DispositionAdmin = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => (
  <html lang="fr">
    <body>{children}</body>
  </html>
);

export default DispositionAdmin;
