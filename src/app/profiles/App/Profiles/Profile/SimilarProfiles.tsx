import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import ContributorCompact from 'components/organisms/Contributor/ContributorCompact';
import { SidebarBox } from './Profile';
import { LogoLetter } from 'components/atoms/icons';
import {
  Button,
  CenterContainer,
  LoadingRotator,
  Title2
} from 'components/atoms';

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
    <>
      <Title2>Profils similaires</Title2>
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
      <CenterContainer>
        <Button to="/les-contributeurs">Voir tout</Button>
      </CenterContainer>
    </>
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
