/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from 'styled-components';
import theme from '../../../theme';
import Header from '../../../../components/website/molecules/Header/Header';
import Footer from '../../../../components/website/organisms/Footer/Footer';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`
        }}
      >
        <main>{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
