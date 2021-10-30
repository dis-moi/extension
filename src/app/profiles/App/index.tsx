import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';

import { dismoiTheme } from 'app/theme';
import store, { history } from '../store';
import Background from './Background';
import PageContainer from './PageContainer';
import Pages from './Pages';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={dismoiTheme}>
      <ConnectedRouter history={history}>
        <Background>
          <PageContainer>
            <Pages />
          </PageContainer>
        </Background>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
