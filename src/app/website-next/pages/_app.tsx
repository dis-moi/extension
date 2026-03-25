import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';
import i18n, { options, SupportedLanguage } from 'libs/i18n';
import { useTheme } from 'libs/facets/useTheme.hook';
import { getFacet } from 'libs/facets/getFacet';
import dynamic from 'next/dynamic';
import useGetMenus from '../hooks/useGetMenus';

const Header = dynamic(() =>
  import('components/website/molecules/Header/Header')
);
const Footer = dynamic(() =>
  import('components/website/organisms/Footer/Footer')
);

if (!i18n.isInitialized) {
  i18n
    .init(options)
    .then(() => null)
    .catch(() => null);
}

export default function App({ Component, pageProps }: AppProps) {
  const theme = useTheme();
  const router = useRouter();
  const facet = getFacet();

  const locale: SupportedLanguage = router.asPath.startsWith('/en')
    ? 'en'
    : 'fr';
  const isHome = /^\/(fr|en)\/?$/.test(router.asPath);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  const switchLanguage = () => {
    const newLocale = locale === 'fr' ? 'en' : 'fr';
    const newPath = newLocale === 'fr' ? '/fr' : '/en';
    i18n.changeLanguage(newLocale).then(() => router.push(newPath));
  };

  const { header, footer } = useGetMenus(locale);

  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
      <Header
        isHome={isHome}
        links={header}
        switchLanguage={switchLanguage}
        facet={facet}
      />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer links={footer} switchLanguage={switchLanguage} />
    </ThemeProvider>
  );
}
