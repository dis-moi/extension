import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import ContributeScreen from './ContributeScreen';
import SubmittedScreen from './SubmittedScreen';
import PreviewScreen from './PreviewScreen';

export default ({ match }: RouteComponentProps) => (
  <Switch>
    <Route path={match.url} exact component={ContributeScreen} />
    <Route path={`${match.url}/preview`} component={PreviewScreen} />
    <Route path={`${match.url}/submitted`} component={SubmittedScreen} />
  </Switch>
);
