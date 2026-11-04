import './browser';
import React from 'react';
import { createRoot } from 'react-dom/client';
import i18n, { options } from '@dismoi/i18n';
import { createBrowserHistory } from 'history';
import { createProfilesStore } from './store';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'libs/store/router';
import Background from './App/Background';
import PageContainer from './App/PageContainer';
import Pages from './App/Pages';
import { useTheme } from 'libs/facets/useTheme.hook';

export const history = createBrowserHistory();
const store = createProfilesStore(history);

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

const App = () => {
  const theme = useTheme();

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

i18n
  .init(options)
  .then(() => null)
  .catch(() => null);

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<App />);
}
