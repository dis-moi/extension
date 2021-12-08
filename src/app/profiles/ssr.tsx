import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { Store } from 'redux';
import { ThemeProvider, useTheme } from 'styled-components';
import i18n, { options } from '../../libs/i18n';
import { createProfilesStore } from './store';
import Background from './App/Background';
import PageContainer from './App/PageContainer';
import Pages from './App/Pages';

interface SsrProps {
  requestedUrl: string;
  store: Store;
}

export const App = ({ requestedUrl, store }: SsrProps) => {
  const theme = useTheme();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StaticRouter context={{}} location={requestedUrl}>
          <Background>
            <PageContainer>
              <Pages />
            </PageContainer>
          </Background>
        </StaticRouter>
      </ThemeProvider>
    </Provider>
  );
};

export const renderAppToString = (requestedUrl: string) => {
  i18n
    .init(options)
    .then(() => null)
    .catch(() => null);

  const store = createProfilesStore();

  renderToString(<App requestedUrl={requestedUrl} store={store} />);
};
