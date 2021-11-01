import React, { useEffect } from 'react';
import { BaseContributor } from '../../../../libs/domain/contributor';
import getContributors from '../REST/getContributors';

export type ContributorsIds = number[];

const useGetContributors = (contributorsIds: ContributorsIds) => {
  const [contributors, setContributors] = React.useState<BaseContributor[]>([]);
  useEffect(() => {
    getContributors().then(res => {
      if (res) {
        const listContributors = res.filter(contributor =>
          contributorsIds.find(id => id === contributor.id)
        );
        setContributors(listContributors);
      }
    });
  }, []);
  return [contributors];
};

export default useGetContributors;
