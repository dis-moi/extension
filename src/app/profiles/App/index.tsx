import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import { useTheme } from 'libs/facets/useTheme.hook';
import store, { history } from '../store';
import Background from './Background';
import PageContainer from './PageContainer';
import Pages from './Pages';

const App = () => {
  const theme = useTheme();
  return (
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
};

export default App;
