import React from 'react';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';

const ContributorsWidth = styled.section`
  padding-bottom: 250px;
`;

const ContributorsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 40px;
  grid-row-gap: 40px;
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
    <ContributorsWidth>
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
    </ContributorsWidth>
  </>
);

SuggestionsScreen.defaultProps = {
  showExampleLink: false,
  highlightExampleLink: false
};

export default SuggestionsScreen;
