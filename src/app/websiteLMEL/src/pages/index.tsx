import * as React from 'react';
import HomePage from '../../../../components/websiteLMEL/pages/HomePage/HomePage';
import useGetContributors from '../hooks/useGetContributors';
import { contributorsIds } from '../contents/ContributorsIds';

const IndexPage = () => {
  const [contributors] = useGetContributors(contributorsIds);

  return <HomePage contributors={contributors} />;
};

export default IndexPage;
