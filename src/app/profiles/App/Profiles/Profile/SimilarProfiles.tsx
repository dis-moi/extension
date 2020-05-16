import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import ContributorCompact from 'components/organisms/Contributor/ContributorCompact';
import Loading from 'components/atoms/icons/Loading';
import { SidebarBox } from './Profile';

interface SimilarProfilesProps {
  loading?: boolean;
  contributors: StatefulContributor[];
  subscribe: (contributor: StatefulContributor) => () => void;
  unsubscribe: (contributor: StatefulContributor) => () => void;
  className?: string;
}

const SimilarProfiles = ({
  loading = false,
  contributors,
  subscribe,
  unsubscribe,
  className
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
    <SidebarBox className={className}>
      {initialContributors.map(contributor => (
        <ContributorCompact
          key={contributor.id}
          contributor={contributor}
          onSubscribe={subscribe(contributor)}
          onUnsubscribe={unsubscribe(contributor)}
        />
      ))}
    </SidebarBox>
  );
};

export default styled(SimilarProfiles)`
  ${ContributorCompact} {
    &:first-child {
      border-top: none;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;
