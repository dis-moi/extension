import React from 'react';
import {
  MemoryRouter as Router, Redirect, Route, Switch
} from 'react-router-dom';
import { NotificationContainer, GlobalStyle } from '../../components/atoms';
import { Notice, About } from './containers/screens';
import { Error, Help } from '../../components/screens';
import NotificationFooter from './components/NotificationFooter';

export default () => (
  <Router>
    <NotificationContainer>
      <GlobalStyle />
      <Switch>
        <Redirect exact path="/" to="/notices" />
        <Route path="/notices" component={Notice} />
        <Route path="/about" component={About} />
        <Route component={Error} />
      </Switch>
      <NotificationFooter />
    </NotificationContainer>
  </Router>
);