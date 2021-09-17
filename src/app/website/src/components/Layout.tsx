import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import i18n, { options, SupportedLanguage } from 'libs/i18n';
import theme from '../../../theme';
import Header from '../../../../components/website/molecules/Header/Header';
import Footer from '../../../../components/website/organisms/Footer/Footer';
import useSwitchLanguage from '../hooks/useSwitchLanguage';
import { PageContext } from '../types';
import useGetMenus from '../hooks/useGetMenus';
import useChangeLanguage from '../hooks/useChangeLanguage';
import './layout.css';
import Seo from './seo';
import { useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  pageContext: PageContext;
  path: string;
  scrolled?: boolean;
}

i18n
  .init(options)
  .then(() => null)
  .catch(() => null);

const Layout = ({
  children,
  pageContext,
  path,
  scrolled = false
}: LayoutProps) => {
  useChangeLanguage(pageContext.langKey as SupportedLanguage);
  const [switchLanguage] = useSwitchLanguage(
    i18n.language as SupportedLanguage
  );
  const { footer, header } = useGetMenus(i18n.language as SupportedLanguage);

  return (
    <ThemeProvider theme={theme}>
      <Seo title={pageContext.title || 'Dis Moi'} />
      <Header
        scrolled={scrolled || (path !== '/' && path !== '/en')}
        links={header}
        switchLanguage={switchLanguage}
      />
      <main>{children}</main>
      <Footer links={footer} switchLanguage={switchLanguage} />
    </ThemeProvider>
  );
};

export default Layout;
