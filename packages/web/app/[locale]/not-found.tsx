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
  // The metadata of a page is static and `not-found` does not receive the
  // route: the title of the document is the only element that cannot follow
  // the locale. It therefore says it in both.
  title: 'Page introuvable · Page not found',
  robots: { index: false, follow: false },
};

/**
 * Rendered inside the layout of the locale: the page keeps its header, its
 * footer and the `lang` attribute of the document.
 *
 * It stays a server component, so that its text appears in the HTML served.
 * The locale reaches it through the header the middleware sets, for want of
 * receiving the route parameters.
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
            {links.map((link, index) => (
              <React.Fragment key={link.href}>
                {index > 0 && ', '}
                <a href={link.href}>{link.label}</a>
              </React.Fragment>
            ))}
            .
          </p>
        }
      />
    </article>
  );
}
