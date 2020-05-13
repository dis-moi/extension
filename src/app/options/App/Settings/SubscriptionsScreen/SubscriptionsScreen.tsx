import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { findContributorIn, StatefulContributor } from 'app/lmem/contributor';
import { Sidebar, Title2, TwoColumns } from 'components/atoms';
import Button from 'components/atoms/Button';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import ContributorLink from 'components/organisms/Contributor/ContributorLink';
import ContributorsListEmpty from 'app/options/App/Settings/ContributorsListEmpty';
import Empty from './Empty';
import SuggestionsSidebar from './SuggestionsSidebar';

const SidebarWrapper = styled(Sidebar)`
  ${Button} {
    margin-top: 10px;
  }
`;

const SidebarTitle = styled(Title2)`
  color: ${props => props.theme.activeColor};
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
  allContributors: StatefulContributor[];
  subscribe: (contributor: StatefulContributor) => () => void;
  unsubscribe: (contributor: StatefulContributor) => () => void;
  goToSuggestions: () => void;
  highlightExampleLink?: boolean;
  noSidebar?: boolean;
  className?: string;
}

export const SubscriptionsScreen = ({
  subscriptions,
  suggestions,
  allContributors,
  subscribe,
  unsubscribe,
  goToSuggestions,
  noSidebar,
  className
}: Props) => {
  const [initialSubscriptions, setInitialSubscriptions] = useState(
    subscriptions
  );

  useEffect(() => {
    if (initialSubscriptions.length === 0)
      setInitialSubscriptions(subscriptions);
  }, [subscriptions]);

  if (allContributors.length === 0) {
    return (
      <ContributorsListEmpty>
        L&apos;extension essaie de retrouver votre liste de contributeurs.
        <br /> Si le problème persiste, veuillez désactiver et réactiver votre
        extension, ou la désinstaller et la réinstaller.
      </ContributorsListEmpty>
    );
  }

  const subscriptionsToRender = initialSubscriptions.map(
    findContributorIn(allContributors)
  );

  if (subscriptionsToRender.length === 0) {
    return <Empty goToSuggestions={goToSuggestions} />;
  }

  const contributorsList = (
    <ContributorsList className={className}>
      {subscriptionsToRender.map(contributor => (
        <ContributorLarge
          key={contributor.id}
          contributor={contributor}
          onSubscribe={subscribe(contributor)}
          onUnsubscribe={unsubscribe(contributor)}
          link={
            <ContributorLink
              href={contributor.contribution.example.matchingUrl}
            >
              Voir un exemple de ses contributions
            </ContributorLink>
          }
        />
      ))}
    </ContributorsList>
  );

  if (noSidebar) {
    return contributorsList;
  }

  return (
    <TwoColumns className={className}>
      {contributorsList}
      <SidebarWrapper>
        <SidebarTitle>Suggestions</SidebarTitle>
        <SuggestionsSidebar
          subscriptions={subscriptions}
          suggestions={suggestions}
          allContributors={allContributors}
          subscribe={subscribe}
          unsubscribe={unsubscribe}
          seeMore={goToSuggestions}
        />
      </SidebarWrapper>
    </TwoColumns>
  );
};

export default styled(SubscriptionsScreen)``;
