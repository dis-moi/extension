import { RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import TOS from './TOS';
import Subscribe from './Subscribe';
import Examples from './Examples';
import Error from '../Error';

export default ({ match }: RouteComponentProps) => (
  <Switch>
    <Route path={match.url} exact component={TOS} />
    <Route path={`${match.url}/subscribe`} component={Subscribe} />
    <Route path={`${match.url}/examples`} component={Examples} />
    <Route component={Error} />
  </Switch>
);
