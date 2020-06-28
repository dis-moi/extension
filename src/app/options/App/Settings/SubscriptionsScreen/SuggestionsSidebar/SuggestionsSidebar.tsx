import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { findContributorIn, StatefulContributor } from 'app/lmem/contributor';
import CenterContainer from 'components/atoms/CenterContainer';
import Button from 'components/atoms/Button';
import ContributorCompact from 'components/organisms/Contributor/ContributorCompact';
import Loading from 'components/atoms/icons/Loading';

const SidebarEmpty = styled.p`
  text-align: center;
  font-size: 16px;
  color: ${props => props.theme.primaryColor};
`;

interface Props {
  loading?: boolean;
  subscriptions: StatefulContributor[];
  suggestions: StatefulContributor[];
  allContributors: StatefulContributor[];
  subscribe: (contributor: StatefulContributor) => () => void;
  unsubscribe: (contributor: StatefulContributor) => () => void;
  seeMore: () => void;
}

const SuggestionsSidebar = ({
  loading = false,
  suggestions,
  allContributors,
  subscribe,
  unsubscribe,
  seeMore
}: Props) => {
  const [initialSuggestions, setInitialSuggestions] = useState(suggestions);

  useEffect(() => {
    if (initialSuggestions.length === 0) setInitialSuggestions(suggestions);
  }, [suggestions]);

  const suggestionsToRender = initialSuggestions.map(
    findContributorIn(allContributors)
  );

  if (loading) {
    return <Loading />;
  }

  return suggestionsToRender.length > 0 ? (
    <>
      {suggestionsToRender.map(contributor => (
        <ContributorCompact
          key={contributor.id}
          contributor={contributor}
          onSubscribe={subscribe(contributor)}
          onUnsubscribe={unsubscribe(contributor)}
        />
      ))}
      <CenterContainer>
        <Button onClick={seeMore}>Voir plus</Button>
      </CenterContainer>
    </>
  ) : (
    <SidebarEmpty>Pas de suggestions pour le moment.</SidebarEmpty>
  );
};

export default SuggestionsSidebar;
