import { Route, Switch } from 'react-router-dom';
import React from 'react';
import List from './List';

export default ({ match }) => (
  <Switch>
    <Route path={match.url} exact component={List} />
  </Switch>
);
