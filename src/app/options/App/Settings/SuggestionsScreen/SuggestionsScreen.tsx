import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import {
  findContributorIn,
  sortContributorsByContributions,
  StatefulContributor
} from 'app/lmem/contributor';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';

const ContributorsList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 30px;
  grid-row-gap: 30px;

  @media (max-width: 975px) {
    grid-column-gap: 15px;
    grid-row-gap: 15px;
  }
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
  preselectedContributorsIds?: number[] | null;
}

const addPreselectedContributors = (
  allContributors: StatefulContributor[],
  preselectedContributorsIds: number[]
) =>
  R.concat(preselectedContributorsIds.map((id: number) =>
    R.find(R.propEq('id', id), allContributors)
  ) as StatefulContributor[]);

const SuggestionsScreen = ({
  subscriptions,
  suggestions,
  subscribe,
  unsubscribe,
  preselectedContributorsIds
}: SuggestionsScreenProps) => {
  const [initialSuggestions, setInitialSuggestions] = useState(suggestions);

  useEffect(() => {
    if (initialSuggestions.length === 0) setInitialSuggestions(suggestions);
  }, [suggestions]);

  const allContributors = R.concat(subscriptions, suggestions);

  const suggestionsToRender = R.pipe(
    R.map(findContributorIn(allContributors)),
    preselectedContributorsIds
      ? addPreselectedContributors(allContributors, preselectedContributorsIds)
      : R.identity,
    R.uniqBy(R.prop('id')),
    sortContributorsByContributions
  )(initialSuggestions);

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
