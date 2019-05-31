import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import List from './List';
import Details from './Details';

export default ({ match }: RouteComponentProps) => (
  <Switch>
    <Route path={match.url} exact component={List} />
    <Route path={`${match.url}/details/:id`} component={Details} />
  </Switch>
);
