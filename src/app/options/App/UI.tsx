import { Redirect, Route, Switch } from 'react-router';
import React from 'react';
import Wrapper from './ScreenWrapper';
import Settings from './Settings';
import Onboarding from './Onboarding';
import Error from '../Error';

const UI = () => (
  <Wrapper>
    <Switch>
      <Redirect exact path="/" to="/settings" />
      <Route path="/settings" component={Settings} />
      <Route path="/onboarding" component={Onboarding} />
      <Route component={Error} />
    </Switch>
  </Wrapper>
);

export default UI;
