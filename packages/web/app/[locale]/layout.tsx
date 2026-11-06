import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentLocale } from '../../lib/content';
import Providers from './Providers';
import SiteChrome from './SiteChrome';

const LOCALES: ContentLocale[] = ['fr', 'en'];

const isSupported = (locale: string): locale is ContentLocale =>
  (LOCALES as string[]).includes(locale);

const descriptions: Record<ContentLocale, string> = {
  fr: 'Ce que les sites web ne vous disent pas, vous le saurez.',
  en: 'What websites do not tell you, you will know.',
};

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export const generateMetadata = ({
  params,
}: {
  params: { locale: string };
}): Metadata => {
  const locale = isSupported(params.locale) ? params.locale : 'fr';

  return {
    // Le gabarit vaut pour toutes les routes de la langue : chaque page n'a
    // plus qu'à donner son propre titre.
    title: { default: 'DisMoi', template: '%s | DisMoi' },
    description: descriptions[locale],
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        LOCALES.map((other) => [other, `/${other}`]),
      ),
    },
  };
};

/**
 * Racine du document. Elle est placée sous `[locale]` pour que l'attribut
 * `lang` du `<html>` soit juste dès le rendu serveur.
 *
 * @see https://nextjs.org/docs/app/guides/internationalization
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!isSupported(params.locale)) {
    notFound();
  }

  const locale = params.locale as ContentLocale;

  return (
    <html lang={locale}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#2b7cb8" />
      </head>
      <body style={{ margin: 0 }}>
        <Providers locale={locale}>
          <SiteChrome locale={locale}>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
