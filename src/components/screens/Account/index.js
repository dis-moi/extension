import { Route, Switch, NavLink } from 'react-router-dom';
import React from 'react';
import Filters from './Filters';
import Menu from './Menu';

export default ({ match, history }) => {
  console.log(history);

  return (
    <Switch>
      <Route path={match.url} exact component={Menu} />
      <Route path={`${match.url}/filters`} component={Filters} />
    </Switch>
  );
};
