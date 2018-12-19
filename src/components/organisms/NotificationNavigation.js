import React from 'react';
import {MemoryRouter as Router, Route, Switch} from 'react-router-dom';
import { NotificationContainer, NotificationFooter, NavLink } from '../atoms';
import {
  Account, Bulle, Help, Subscriptions, Error
} from '../screens';
import {
  Account as AccountIcon,
  Bubble,
  CheckList,
  Help as HelpIcon
} from '../atoms/icons/nav';
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
      <NotificationFooter>
        <NavLink to="/">
          <Bubble />
        </NavLink>
        <NavLink to="/subscriptions">
          <CheckList />
        </NavLink>
        <NavLink to="/help">
          <HelpIcon />
        </NavLink>
        <NavLink to="/account">
          <AccountIcon />
        </NavLink>
      </NotificationFooter>
    </NotificationContainer>
  </Router>
);