import * as React from 'react';
import Layout from '../components/Layout';
import HomePage from '../../../../components/website/pages/HomePage/HomePage';

const IndexPage = () => {
  return (
    <Layout pageTitle={"Page d'accueil dis moi"}>
      <HomePage />
    </Layout>
  );
};

export default IndexPage;
