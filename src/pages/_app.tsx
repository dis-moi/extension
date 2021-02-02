import App from 'next/app';
import { wrapper } from '../app/profiles/store';
import React from 'react';

import '../styles/wp-block.css';
import '../styles/parent-style.css';
import '../styles/divy.css';
import '../styles/et.css';
import '../styles/style.css';
import Layout from '../next_components/layout';

class ExampleApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

// wrapper.withRedux wraps the App with react-redux's Provider
export default wrapper.withRedux(ExampleApp);
