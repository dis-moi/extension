import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import { findContributorIn, StatefulContributor } from 'app/lmem/contributor';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import Empty from './Empty';
import SuggestionsSidebar from './SuggestionsSidebar';

const TwoColumns = styled.div`
  display: grid;
  grid-column-gap: 55px;
  grid-template-columns: auto 290px;
`;

const ContributorsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 40px;
  grid-row-gap: 40px;
  align-items: flex-start;
`;

interface Props {
  subscriptions: StatefulContributor[];
  suggestions: StatefulContributor[];
  subscribe: (contributor: StatefulContributor) => () => void;
  unsubscribe: (contributor: StatefulContributor) => () => void;
  goToSuggestions: () => void;
  highlightExampleLink?: boolean;
}

export const SubscriptionsScreen = ({
  subscriptions,
  suggestions,
  subscribe,
  unsubscribe,
  goToSuggestions,
  highlightExampleLink
}: Props) => {
  const [initialSubscriptions, setInitialSubscriptions] = useState(
    subscriptions
  );

  useEffect(() => {
    if (initialSubscriptions.length === 0)
      setInitialSubscriptions(subscriptions);
  }, [subscriptions]);

  const subscriptionsToRender = initialSubscriptions.map(
    findContributorIn(R.concat(subscriptions, suggestions))
  );

  return (
    <>
      {subscriptionsToRender.length === 0 ? (
        <Empty goToSuggestions={goToSuggestions} />
      ) : (
        <TwoColumns>
          <ContributorsList>
            {subscriptionsToRender.map(contributor => (
              <ContributorLarge
                key={contributor.id}
                contributor={contributor}
                onSubscribe={subscribe(contributor)}
                onUnsubscribe={unsubscribe(contributor)}
                showExampleLink
                highlightExampleLink={highlightExampleLink}
              />
            ))}
          </ContributorsList>
          <SuggestionsSidebar
            subscriptions={subscriptions}
            suggestions={suggestions}
            subscribe={subscribe}
            unsubscribe={unsubscribe}
            goToSuggestions={goToSuggestions}
          />
        </TwoColumns>
      )}
    </>
  );
};

export default SubscriptionsScreen;
