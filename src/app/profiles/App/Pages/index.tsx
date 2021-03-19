import { Redirect, Route, Switch } from 'react-router';
import React from 'react';
import Profiles from './Profiles';
import Error from './Error';
import Subscriptions from './Subscriptions';
import { CONTRIBUTORS_PATH } from '../../routes';

const Pages = () => (
  <>
    <Switch>
      <Redirect exact path="/" to={CONTRIBUTORS_PATH} />
      <Redirect from={'/en/*'} to={CONTRIBUTORS_PATH} />
      <Route path={CONTRIBUTORS_PATH} component={Profiles} />
      <Route path="/mes-abonnements" component={Subscriptions} />
      <Route component={Error} />
    </Switch>
  </>
);

export default Pages;
