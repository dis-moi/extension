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
  align-items: flex-start;
`;

const ContributorsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 30px;
  grid-row-gap: 30px;
`;

interface Props {
  subscriptions: StatefulContributor[];
  suggestions: StatefulContributor[];
  subscribe: (contributor: StatefulContributor) => () => void;
  unsubscribe: (contributor: StatefulContributor) => () => void;
  goToSuggestions: () => void;
  highlightExampleLink?: boolean;
  noSidebar?: boolean;
}

export const SubscriptionsScreen = ({
  subscriptions,
  suggestions,
  subscribe,
  unsubscribe,
  goToSuggestions,
  highlightExampleLink,
  noSidebar
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

  if (subscriptionsToRender.length === 0) {
    return <Empty goToSuggestions={goToSuggestions} />;
  }

  const contributorsList = (
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
  );

  if (noSidebar) {
    return contributorsList;
  }

  return (
    <TwoColumns>
      {contributorsList}
      <SuggestionsSidebar
        subscriptions={subscriptions}
        suggestions={suggestions}
        subscribe={subscribe}
        unsubscribe={unsubscribe}
        goToSuggestions={goToSuggestions}
      />
    </TwoColumns>
  );
};

export default SubscriptionsScreen;
