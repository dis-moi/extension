import React from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import { NotificationContainer } from '../atoms';
import NotificationFooter from '../molecules/NotificationFooter';
import {
  Account, Bulle, Help, Subscriptions, Error
} from '../screens';
import Details from '../screens/Bulle/Details';

export default () => (
  <Router>
    <NotificationContainer>
      <Switch>
        <Route exact path="/" component={Bulle} />
        <Route path="/subscriptions" component={Subscriptions} />
        <Route path="/help" component={Help} />
        <Route path="/account" component={Account} />
        <Route path="/details" component={Details} />
        <Route component={Error} />
      </Switch>
      <NotificationFooter />
    </NotificationContainer>
  </Router>
);