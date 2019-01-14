import React from 'react';
import {
  MemoryRouter as Router, Redirect, Route, Switch
} from 'react-router-dom';
import { NotificationContainer } from '../atoms';
import { NotificationFooter } from '../molecules';
import {
  Account, Notice, Help, Subscriptions, Error
} from '../screens';

export default () => (
  <Router>
    <NotificationContainer>
      <Switch>
        <Redirect exact path="/" to="/notices" />
        <Route path="/notices" component={Notice} />
        <Route path="/subscriptions" component={Subscriptions} />
        <Route path="/help" component={Help} />
        <Route path="/account" component={Account} />
        <Route component={Error} />
      </Switch>
      <NotificationFooter />
    </NotificationContainer>
  </Router>
);