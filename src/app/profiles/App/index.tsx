import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';

import theme from 'app/theme';
import store, { history } from '../store';
import Background from './Background';
import PageContainer from './PageContainer';
import Profiles from './Profiles';
import Error from './Error';
import Subscriptions from './Subscriptions';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <Background>
          <PageContainer>
            <Switch>
              <Redirect exact path="/" to="/informateurs" />
              <Route path="/informateurs" component={Profiles} />
              <Route path="/mes-abonnements" component={Subscriptions} />
              <Route component={Error} />
            </Switch>
          </PageContainer>
        </Background>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
