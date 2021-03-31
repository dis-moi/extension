import { Redirect, Route, Switch } from 'react-router';
import React from 'react';
import Profiles from './Profiles';
import Error from './Error';
import Subscriptions from './Subscriptions';
import { path } from '../../../routes';

const Pages = () => (
  <>
    <Switch>
      <Redirect exact path="/" to={path.fr.CONTRIBUTORS} />
      <Redirect exact path="/en" to={path.en.CONTRIBUTORS} />
      <Route path={path.fr.CONTRIBUTORS} component={Profiles} />
      <Route path={path.en.CONTRIBUTORS} component={Profiles} />
      <Route path={path.fr.SUBSCRIPTIONS} component={Subscriptions} />
      <Route path={path.en.SUBSCRIPTIONS} component={Subscriptions} />
      <Route component={Error} />
    </Switch>
  </>
);

export default Pages;
