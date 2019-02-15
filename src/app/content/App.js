import React from 'react';
import { Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router/immutable'
import { ThemeProvider } from 'styled-components'
import { NotificationContainer, GlobalStyle } from '../../components/atoms';
import theme from '../theme'
import { Notice, About } from './containers/screens';
import { Error, Help } from '../../components/screens';
import NotificationFooter from './components/NotificationFooter';
import store, { history } from './store'

export default () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
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
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);
