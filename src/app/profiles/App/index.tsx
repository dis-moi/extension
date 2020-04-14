import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';

import FontsStyle from 'components/atoms/FontsStyle';
import theme from 'app/theme';
import store, { history } from '../store';
import Profiles from './Profiles';
import Error from './Error';

const App = () => (
  <Provider store={store}>
    <FontsStyle getURL={(path: string) => path} />
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <Switch>
          <Redirect exact path="/" to="/profiles" />
          <Route path="/profiles" component={Profiles} />
          <Route component={Error} />
        </Switch>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
