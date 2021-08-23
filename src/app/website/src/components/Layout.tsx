import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../../theme';
import Header, {
  Scrolled
} from '../../../../components/website/molecules/Header/Header';
import Footer from '../../../../components/website/organisms/Footer/Footer';
import Seo from './seo';
import './layout.css';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  scrolled?: Scrolled;
}

const Layout = ({ children, pageTitle, scrolled }: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Seo title={pageTitle} />
      <Header scrolled={scrolled} />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
