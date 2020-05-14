import React, { ReactElement, useEffect, useState } from 'react';
import { StatefulContributor } from 'app/lmem/contributor';
import ContributorCompact from 'components/organisms/Contributor/ContributorCompact';
import Loading from 'components/atoms/icons/Loading';

interface SimilarProfilesProps {
  loading?: boolean;
  contributors: StatefulContributor[];
  subscribe: (contributor: StatefulContributor) => () => void;
  unsubscribe: (contributor: StatefulContributor) => () => void;
  children: ReactElement;
}

const SimilarProfiles = ({
  loading = false,
  contributors,
  subscribe,
  unsubscribe,
  children
}: SimilarProfilesProps) => {
  const [initialContributors, setInitialSuggestions] = useState(contributors);

  useEffect(() => {
    if (initialContributors.length === 0) setInitialSuggestions(contributors);
  }, [contributors]);

  if (loading) {
    return <Loading />;
  }

  if (initialContributors.length === 0) {
    return null;
  }

  return (
    <>
      {initialContributors.map(contributor => (
        <ContributorCompact
          key={contributor.id}
          contributor={contributor}
          onSubscribe={subscribe(contributor)}
          onUnsubscribe={unsubscribe(contributor)}
        />
      ))}
      {children}
    </>
  );
};

export default SimilarProfiles;
