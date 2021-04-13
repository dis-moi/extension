import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';

import store, { history } from '../store';
import Background from './Background';
import PageContainer from './PageContainer';
import Pages from './Pages';
import theme from 'app/theme';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
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
