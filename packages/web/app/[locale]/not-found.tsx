import React from 'react';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import {
  LOCALE_HEADER,
  localeFromHeader,
  notFoundContent,
} from '../../lib/notFoundContent';
import ContentView from './ContentView';

export const metadata: Metadata = {
  // Les métadonnées d'une page sont statiques et `not-found` ne reçoit pas la
  // route : le titre du document est le seul élément qui ne peut pas suivre la
  // langue. Il le dit donc dans les deux.
  title: 'Page introuvable · Page not found',
  robots: { index: false, follow: false },
};

/**
 * Rendue à l'intérieur de la mise en page de la langue : la page garde son
 * en-tête, son pied et l'attribut `lang` du document.
 *
 * Elle reste un composant serveur, pour que son texte figure dans le HTML
 * servi. La langue lui vient de l'en-tête posé par le middleware, faute de
 * recevoir les paramètres de la route.
 */
export default function NotFound() {
  const { intro, links, title } = notFoundContent(
    localeFromHeader(headers().get(LOCALE_HEADER)),
  );

  return (
    <article>
      <ContentView
        title={title}
        content={
          <p>
            {intro}{' '}
            {links.map((lien, index) => (
              <React.Fragment key={lien.href}>
                {index > 0 && ', '}
                <a href={lien.href}>{lien.label}</a>
              </React.Fragment>
            ))}
            .
          </p>
        }
      />
    </article>
  );
}
