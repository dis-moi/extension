'use client';

import React, { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Header from '@dismoi/ui/website/molecules/Header/Header';
import Footer from '@dismoi/ui/website/organisms/Footer/Footer';
import { getFacet } from 'libs/facets/getFacet';
import { ContentLocale } from '../../lib/content';
import { getMenus } from '../../lib/menus';

interface SiteChromeProps {
  locale: ContentLocale;
  children: ReactNode;
}

const otherLocale = (locale: ContentLocale): ContentLocale =>
  locale === 'fr' ? 'en' : 'fr';

/**
 * The header and the footer surround every route of a locale. They live in
 * the browser — scrolling, mobile menu, language switch — and receive from
 * the server nothing but the locale, a plain string.
 */
export default function SiteChrome({ locale, children }: SiteChromeProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { header, footer } = getMenus(locale);

  const switchLanguage = () => router.push(`/${otherLocale(locale)}`);

  return (
    <>
      <Header
        isHome={pathname === `/${locale}`}
        links={header}
        switchLanguage={switchLanguage}
        facet={getFacet()}
      />
      <main>{children}</main>
      <Footer links={footer} switchLanguage={switchLanguage} />
    </>
  );
}
