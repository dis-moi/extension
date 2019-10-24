import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import { findContributorIn, StatefulContributor } from 'app/lmem/contributor';
import ContributorCompact from 'components/organisms/Contributor/ContributorCompact';
import CenterContainer from 'components/atoms/CenterContainer';
import Button from 'components/atoms/Button';

const Sidebar = styled.aside`
  ${Button} {
    margin-top: 10px;
  }
`;

const SidebarTitle = styled.h2`
  margin: 0 0 5px;
  font-size: 20px;
  color: ${props => props.theme.activeColor};
  font-weight: bold;
`;

const SidebarEmpty = styled.p`
  text-align: center;
  font-size: 16px;
  color: ${props => props.theme.primaryColor};
`;

interface Props {
  subscriptions: StatefulContributor[];
  suggestions: StatefulContributor[];
  subscribe: (contributor: StatefulContributor) => () => void;
  unsubscribe: (contributor: StatefulContributor) => () => void;
  goToSuggestions: () => void;
}

const SuggestionsSidebar = ({
  subscriptions,
  suggestions,
  subscribe,
  unsubscribe,
  goToSuggestions
}: Props) => {
  const [initialSuggestions, setInitialSuggestions] = useState(suggestions);

  useEffect(() => {
    if (initialSuggestions.length === 0) setInitialSuggestions(suggestions);
  }, [suggestions]);

  const suggestionsToRender = initialSuggestions.map(
    findContributorIn(R.concat(subscriptions, suggestions))
  );

  return (
    <Sidebar>
      <SidebarTitle>Suggestions</SidebarTitle>
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
    </Sidebar>
  );
};

export default SuggestionsSidebar;
