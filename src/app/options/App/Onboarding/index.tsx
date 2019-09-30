import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import TOS from './TOS';
import Subscribe from './Subscribe';
import Examples from './Examples';
import ScrollToTop from './ScrollToTop';

export default ({ match, location }: RouteComponentProps) => (
  <ScrollToTop location={location}>
    <Switch>
      <Route path={match.url} exact component={TOS} />
      <Route path={`${match.url}/subscribe`} component={Subscribe} />
      <Route path={`${match.url}/examples`} component={Examples} />
    </Switch>
  </ScrollToTop>
);
