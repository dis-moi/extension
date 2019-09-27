import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';
import SubscriptionsScreen from './SubscriptionsScreen';
import SuggestionsScreen from './SuggestionsScreen';
import React from 'react';
import Header from './Header';
import ContributorNav from 'components/organisms/ContributorNav/ContributorNav';
import withConnect from './withConnect';
import { OptionsScreen } from '../../screens';

interface Props extends RouteComponentProps {
  currentScreen: OptionsScreen | null;
  goToSubscriptions: () => void;
  goToSuggestions: () => void;
}

const UI = ({
  currentScreen,
  goToSuggestions,
  goToSubscriptions,
  match
}: Props) => (
  <>
    <Header />

    <ContributorNav
      activeTab={currentScreen}
      goToSubscriptions={goToSubscriptions}
      goToSuggestions={goToSuggestions}
    />

    <Switch>
      <Redirect exact path={match.url} to={`${match.url}/subscriptions`} />
      <Route
        path={`${match.url}/subscriptions`}
        component={SubscriptionsScreen}
      />
      <Route path={`${match.url}/suggestions`} component={SuggestionsScreen} />
    </Switch>
  </>
);

export default withConnect(UI);
