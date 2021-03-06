import { RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Error from '../Error';
import Filters from './Filters/Filters';
import Menu from './Menu';
import About from './About';

export default ({ match }: RouteComponentProps) => (
  <Switch>
    <Route path={match.url} exact component={Menu} />
    <Route path={`${match.url}/about`} component={About} />
    <Route path={`${match.url}/filters`} component={Filters} />
    <Route component={Error} />
  </Switch>
);
