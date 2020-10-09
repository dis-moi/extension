import { Redirect, Route, Switch } from 'react-router';
import React from 'react';
import Profiles from './Profiles';
import Error from './Error';
import Subscriptions from './Subscriptions';

const Pages = () => (
  <>
    <Switch>
      <Redirect exact path="/" to="/sources" />
      <Route path="/sources" component={Profiles} />
      <Route path="/mes-abonnements" component={Subscriptions} />
      <Route component={Error} />
    </Switch>
  </>
);

export default Pages;
