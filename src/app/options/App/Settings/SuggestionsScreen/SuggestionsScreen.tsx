import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import { findContributorIn, StatefulContributor } from 'app/lmem/contributor';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';

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
  unsubscribe
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
              showExampleLink
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

export default SuggestionsScreen;
