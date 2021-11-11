import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import i18n, { options, SupportedLanguage } from 'libs/i18n';
import { useTheme } from 'libs/facets/useTheme.hook';
import Header from '../../../../components/website/molecules/Header/Header';
import Footer from '../../../../components/website/organisms/Footer/Footer';
import useSwitchLanguage from '../hooks/useSwitchLanguage';
import { PageContext } from '../types';
import useGetMenus from '../hooks/useGetMenus';
import useChangeLanguage from '../hooks/useChangeLanguage';
import './layout.css';
import Seo from './seo';
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { getFacet } from '../../../../libs/facets/getFacet';

interface LayoutProps {
  children: React.ReactNode;
  pageContext: PageContext;
  path: string;
}

i18n
  .init(options)
  .then(() => null)
  .catch(() => null);

const Layout = ({ children, pageContext, path }: LayoutProps) => {
  const theme = useTheme();
  useChangeLanguage(path);

  const [switchLanguage] = useSwitchLanguage();
  const { footer, header } = useGetMenus(i18n.language as SupportedLanguage);
  const [isHome, setIsHome] = useState(true);
  const facet = getFacet();
  const eng = new RegExp(/^\/en\/$|^\/en$/);
  useEffect(() => setIsHome(path === '/' || eng.test(path)), [path]);

  return (
    <ThemeProvider theme={theme}>
      <Seo title={pageContext.title || 'DisMoi'} />
      <Header
        isHome={isHome}
        links={header}
        switchLanguage={switchLanguage}
        facet={facet}
      />
      <Helmet htmlAttributes={{ lang: i18n.language }} />
      <main>{children}</main>
      <Footer links={footer} switchLanguage={switchLanguage} />
    </ThemeProvider>
  );
};

export default Layout;
