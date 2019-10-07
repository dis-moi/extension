import React from 'react';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';

const ContributorsList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 30px;
  grid-row-gap: 30px;
`;

const ContributorsListEmpty = styled.p`
  text-align: center;
  font-size: 18px;
  color: ${props => props.theme.primaryColor};
`;

export interface SuggestionsScreenProps {
  suggestions: StatefulContributor[];
  subscribe: (contributor: StatefulContributor) => () => void;
  unsubscribe: (contributor: StatefulContributor) => () => void;
  showExampleLink?: boolean;
  highlightExampleLink?: boolean;
}

const SuggestionsScreen = ({
  suggestions,
  subscribe,
  unsubscribe,
  showExampleLink,
  highlightExampleLink
}: SuggestionsScreenProps) => (
  <>
    {suggestions.length > 0 ? (
      <ContributorsList>
        {suggestions.map(contributor => (
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

SuggestionsScreen.defaultProps = {
  showExampleLink: false,
  highlightExampleLink: false
};

export default SuggestionsScreen;
