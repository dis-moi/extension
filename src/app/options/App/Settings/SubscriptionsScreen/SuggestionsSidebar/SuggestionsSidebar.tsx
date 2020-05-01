import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { findContributorIn, StatefulContributor } from 'app/lmem/contributor';
import CenterContainer from 'components/atoms/CenterContainer';
import Button from 'components/atoms/Button';
import ContributorCompact from 'components/organisms/Contributor/ContributorCompact';

const SidebarEmpty = styled.p`
  text-align: center;
  font-size: 16px;
  color: ${props => props.theme.primaryColor};
`;

interface Props {
  subscriptions: StatefulContributor[];
  suggestions: StatefulContributor[];
  allContributors: StatefulContributor[];
  subscribe: (contributor: StatefulContributor) => () => void;
  unsubscribe: (contributor: StatefulContributor) => () => void;
  goToSuggestions: () => void;
}

const SuggestionsSidebar = ({
  suggestions,
  allContributors,
  subscribe,
  unsubscribe,
  goToSuggestions
}: Props) => {
  const [initialSuggestions, setInitialSuggestions] = useState(suggestions);

  useEffect(() => {
    if (initialSuggestions.length === 0) setInitialSuggestions(suggestions);
  }, [suggestions]);

  const suggestionsToRender = initialSuggestions.map(
    findContributorIn(allContributors)
  );

  return (
    <>
      {suggestionsToRender.length > 0 ? (
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
            <Button onClick={goToSuggestions}>Voir plus</Button>
          </CenterContainer>
        </>
      ) : (
        <SidebarEmpty>Pas de suggestions pour le moment.</SidebarEmpty>
      )}
    </>
  );
};

export default SuggestionsSidebar;
