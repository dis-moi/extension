import { Route, Switch } from 'react-router-dom';
import React from 'react';
import List from './List';
import Details from './Details';
import Error from '../Error';

export default ({ match }) => (
  <Switch>
    <Route path={match.url} exact component={List} />
    <Route path={`${match.url}/details`} component={Details} />
    <Route component={Error} />
  </Switch>
);
