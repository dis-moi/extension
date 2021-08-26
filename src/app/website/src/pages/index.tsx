import * as React from 'react';
import Layout from '../components/Layout';
import HomePage from '../../../../components/website/pages/HomePage/HomePage';
import useGetContributors from '../hooks/useGetContributors';
import { contributorsIds } from '../contents/ContributorsIds';

const IndexPage = () => {
  const [contributors] = useGetContributors(contributorsIds);

  return (
    <Layout pageTitle={"Page d'accueil dis moi"}>
      <HomePage contributors={contributors} />
    </Layout>
  );
};

export default IndexPage;
