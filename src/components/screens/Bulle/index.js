import { Route, Switch } from 'react-router-dom';
import React from 'react';
import List from './List';
import Details from './Details';

export default ({ match }) => (
  <Switch>
    <Route path={match.url} exact component={List} />
    <Route path={`${match.url}/details`} component={Details} />
  </Switch>
);
