import React from 'react';
import Tab from 'components/atoms/Tab/Tab';
import { OptionsScreen } from 'app/options/screens';
import Container from './Container';

interface Props {
  activeTab: OptionsScreen | null;
  goToSubscriptions: () => void;
  goToSuggestions: () => void;
}

export const ContributorNav = ({
  activeTab,
  goToSubscriptions,
  goToSuggestions
}: Props) => (
  <Container>
    <Tab active={activeTab === 'subscriptions'} onClick={goToSubscriptions}>
      Mes abonnements
    </Tab>
    <Tab active={activeTab === 'suggestions'} onClick={goToSuggestions}>
      Suggestions
    </Tab>
  </Container>
);

export default ContributorNav;
