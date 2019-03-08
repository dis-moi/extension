import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Filters from './Filters/Filters';
import Menu from './Menu/Menu';
import About from './About/About';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';

export default ({ match }) => (
  <Switch>
    <Route path={match.url} exact component={Menu} />
    <Route path={`${match.url}/about`} component={About} />
    <Route path={`${match.url}/privacy`} component={Loading} />
    <Route path={`${match.url}/filters`} component={Filters} />
    <Route component={Error} />
  </Switch>
);
