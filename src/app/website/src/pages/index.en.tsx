import * as React from 'react';
import { getFacet } from 'libs/facets/getFacet';
import HomePage from '../../../../components/website/pages/HomePage/HomePage';
import useGetContributors from '../hooks/useGetContributors';
import { contributorsIds } from '../contents/ContributorsIds';

const IndexPage = () => {
  const [contributors] = useGetContributors(contributorsIds[getFacet()]);

  return <HomePage contributors={contributors} />;
};

export default IndexPage;
