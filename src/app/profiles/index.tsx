import './browser';
import React from 'react';
import { render } from 'react-dom';
import i18n, { options } from 'libs/i18n';
import { createBrowserHistory } from 'history';
import { createProfilesStore } from './store';
import { Provider } from 'react-redux';
import { ThemeProvider, useTheme } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import Background from './App/Background';
import PageContainer from './App/PageContainer';
import Pages from './App/Pages';

export const history = createBrowserHistory();
const store = createProfilesStore(history);

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

i18n
  .init(options)
  .then(() => null)
  .catch(() => null);

render(<App />, document.getElementById('root'));
