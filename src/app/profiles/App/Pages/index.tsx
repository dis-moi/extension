import { Redirect, Route, Switch } from 'react-router';
import React from 'react';
import Profiles from './Profiles';
import Error from './Error';
import Subscriptions from './Subscriptions';
import { SOURCES } from '../../routes';

const Pages = () => (
  <>
    <Switch>
      <Redirect exact path="/" to={SOURCES} />
      <Route path={SOURCES} component={Profiles} />
      <Route path="/mes-abonnements" component={Subscriptions} />
      <Route component={Error} />
    </Switch>
  </>
);

export default Pages;
