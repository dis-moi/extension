import React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';
import ContributorNav from 'components/organisms/ContributorNav/ContributorNav';
import { OptionsScreen } from '../../screens';
import SubscriptionsScreen from './SubscriptionsScreen';
import SuggestionsScreen from './SuggestionsScreen';
import Header from './Header';
import withConnect from './withConnect';

interface Props extends RouteComponentProps {
  currentScreen: OptionsScreen | null;
  goToSubscriptions: () => void;
  goToSuggestions: () => void;
  tosAccepted?: boolean;
}

const UI = ({
  currentScreen,
  goToSuggestions,
  goToSubscriptions,
  match,
  tosAccepted
}: Props) =>
  tosAccepted === false ? (
    <Redirect to={'/onboarding'} />
  ) : (
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
        <Route
          path={`${match.url}/suggestions`}
          component={SuggestionsScreen}
        />
      </Switch>
    </>
  );

export default withConnect(UI);
