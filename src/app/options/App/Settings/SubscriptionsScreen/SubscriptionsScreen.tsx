import React from 'react';
import styled from 'styled-components';
import { StatefulContributor } from 'app/lmem/contributor';
import Button from 'components/atoms/Button';
import CenterContainer from 'components/atoms/CenterContainer';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import ContributorCompact from 'components/organisms/Contributor/ContributorCompact';
import withConnect from './withConnect';
import Empty from './Empty';

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

export const SubscriptionsScreen = ({
  subscriptions,
  suggestions,
  subscribe,
  unsubscribe,
  goToSuggestions
}: Props) => (
  <>
    {subscriptions.length === 0 ? (
      <Empty goToSuggestions={goToSuggestions} />
    ) : (
      <TwoColumns>
        <ContributorsList>
          {subscriptions.map(contributor => (
            <ContributorLarge
              key={contributor.id}
              contributor={contributor}
              onSubscribe={subscribe(contributor)}
              onUnsubscribe={unsubscribe(contributor)}
              showExampleLink
            />
          ))}
        </ContributorsList>

        <Sidebar>
          <SidebarTitle>Suggestions</SidebarTitle>
          {suggestions.length > 0 ? (
            <>
              {suggestions.map(contributor => (
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
      </TwoColumns>
    )}
  </>
);

export default withConnect(SubscriptionsScreen);
