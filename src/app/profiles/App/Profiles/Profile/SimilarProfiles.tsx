import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import ContributorCompact from 'components/organisms/Contributor/ContributorCompact';
import { SidebarBox } from './Profile';
import { LogoLetter } from 'components/atoms/icons';
import { CenterContainer, LoadingRotator } from 'components/atoms';

interface SimilarProfilesProps {
  loading?: boolean;
  contributors: StatefulContributor[];
  subscribe: (contributor: StatefulContributor) => () => void;
  unsubscribe: (contributor: StatefulContributor) => () => void;
  className?: string;
}

const Loader = styled(CenterContainer)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

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
    return (
      <Loader>
        <LoadingRotator>
          <LogoLetter />
        </LoadingRotator>
      </Loader>
    );
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
