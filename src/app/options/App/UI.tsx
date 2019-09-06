import { Redirect, Route, Switch } from 'react-router';
import SubscriptionsScreen from './SubscriptionsScreen/SubscriptionsScreen';
import SuggestionsScreen from './SuggestionsScreen/SuggestionsScreen';
import React from 'react';
import Wrapper from './ScreenWrapper';
import Header from './Header';
import ContributorNav from '../../../components/organisms/ContributorNav/ContributorNav';
import withConnect from './withConnect';
import { OptionsScreen } from '../screens';

interface Props {
  currentScreen: OptionsScreen | null;
  goToSubscriptions: () => void;
  goToSuggestions: () => void;
}

const UI = ({ currentScreen, goToSuggestions, goToSubscriptions }: Props) => (
  <Wrapper>
    <Header />

    <ContributorNav
      activeTab={currentScreen}
      goToSubscriptions={goToSubscriptions}
      goToSuggestions={goToSuggestions}
    />

    <Switch>
      <Redirect exact path="/" to="/subscriptions" />
      <Route path="/subscriptions" component={SubscriptionsScreen} />
      <Route path="/suggestions" component={SuggestionsScreen} />
    </Switch>
  </Wrapper>
);

export default withConnect(UI);
