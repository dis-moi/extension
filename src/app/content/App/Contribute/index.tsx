import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import SubmitScreen from './Submit';
import SubmittedScreen from './Submitted';
import PreviewScreen from './Preview';

export default ({ match }: RouteComponentProps) => (
  <Switch>
    <Route path={match.url} exact component={SubmitScreen} />
    <Route path={`${match.url}/preview`} component={PreviewScreen} />
    <Route path={`${match.url}/submitted`} component={SubmittedScreen} />
  </Switch>
);
