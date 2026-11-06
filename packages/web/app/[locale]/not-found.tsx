import React from 'react';
import type { Metadata } from 'next';
import ContentView from './ContentView';

export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: false },
};

/**
 * Rendue à l'intérieur de la mise en page de la langue : la page garde donc
 * son en-tête, son pied et surtout l'attribut `lang` du document.
 */
export default function NotFound() {
  return (
    <article>
      <ContentView
        title="Page introuvable"
        content={
          <p>
            Cette adresse ne correspond à aucune page. Les contributeurs sont
            sur <a href="/fr/profils">la page des profils</a>, et l’aide sur{' '}
            <a href="/fr/aide">la page d’aide</a>.
          </p>
        }
      />
    </article>
  );
}
