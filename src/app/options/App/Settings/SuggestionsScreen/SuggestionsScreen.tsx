import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { findContributorIn, StatefulContributor } from 'app/lmem/contributor';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import * as R from 'ramda';

const ContributorsList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 40px;
  grid-row-gap: 40px;
`;

const ContributorsListEmpty = styled.p`
  text-align: center;
  font-size: 18px;
  color: ${props => props.theme.primaryColor};
`;

export interface SuggestionsScreenProps {
  subscriptions: StatefulContributor[];
  suggestions: StatefulContributor[];
  subscribe: (contributor: StatefulContributor) => () => void;
  unsubscribe: (contributor: StatefulContributor) => () => void;
  showExampleLink?: boolean;
  highlightExampleLink?: boolean;
}

const SuggestionsScreen = ({
  subscriptions,
  suggestions,
  subscribe,
  unsubscribe,
  showExampleLink,
  highlightExampleLink
}: SuggestionsScreenProps) => {
  const [initialSuggestions, setInitialSuggestions] = useState(suggestions);

  useEffect(() => {
    if (initialSuggestions.length === 0) setInitialSuggestions(suggestions);
  }, [suggestions]);

  const suggestionsToRender = initialSuggestions.map(
    findContributorIn(R.concat(subscriptions, suggestions))
  );
  return (
    <>
      {suggestionsToRender.length > 0 ? (
        <ContributorsList>
          {suggestionsToRender.map(contributor => (
            <ContributorLarge
              key={contributor.id}
              contributor={contributor}
              onSubscribe={subscribe(contributor)}
              onUnsubscribe={unsubscribe(contributor)}
              showExampleLink={showExampleLink}
              highlightExampleLink={highlightExampleLink}
            />
          ))}
        </ContributorsList>
      ) : (
        <ContributorsListEmpty>
          Pas de suggestions pour le moment.
        </ContributorsListEmpty>
      )}
    </>
  );
};

SuggestionsScreen.defaultProps = {
  showExampleLink: false,
  highlightExampleLink: false
};

export default SuggestionsScreen;
