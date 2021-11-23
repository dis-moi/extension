import * as React from 'react';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import i18n, { options } from 'libs/i18n';
import { useTheme } from 'libs/facets/useTheme.hook';
import Header from '../../../../components/website/molecules/Header/Header';
import Footer from '../../../../components/website/organisms/Footer/Footer';
import useSwitchLanguage from '../hooks/useSwitchLanguage';
import { PageContext } from '../types';
import useChangeLanguage from '../hooks/useChangeLanguage';
import './layout.css';
import { Helmet } from 'react-helmet';
import { getFacet } from '../../../../libs/facets/getFacet';
import StaticSeo from './StaticSeo';

interface LayoutProps {
  children: React.ReactNode;
  pageContext: PageContext;
  path: string;
}

i18n
  .init(options)
  .then(() => null)
  .catch(() => null);

const StaticLayout = ({ children, pageContext, path }: LayoutProps) => {
  const theme = useTheme();
  useChangeLanguage(path);

  const [switchLanguage] = useSwitchLanguage();
  const [isHome, setIsHome] = useState(true);
  const facet = getFacet();
  const eng = new RegExp(/^\/en\/$|^\/en$/);
  useEffect(() => setIsHome(path === '/' || eng.test(path)), [path]);

  return (
    <ThemeProvider theme={theme}>
      <StaticSeo title={pageContext.title || 'DisMoi'} />
      <Header
        isHome={isHome}
        links={[]}
        switchLanguage={switchLanguage}
        facet={facet}
      />
      <Helmet htmlAttributes={{ lang: i18n.language }} />
      <main>{children}</main>
      <Footer links={[]} switchLanguage={switchLanguage} />
    </ThemeProvider>
  );
};

export default StaticLayout;
