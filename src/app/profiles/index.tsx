import './browser';
import React from 'react';
import { render } from 'react-dom';
import i18n, { options } from 'libs/i18n';
import { createBrowserHistory } from 'history';
import { createProfilesStore } from './store';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import * as R from 'ramda';
import Background from './App/Background';
import PageContainer from './App/PageContainer';
import Pages from './App/Pages';
import { useTheme } from 'libs/facets/useTheme.hook';
import { getFacet } from '../../libs/facets/getFacet';
import StaticLayout from '../website/src/components/StaticLayout';

export const history = createBrowserHistory();
const store = createProfilesStore(history);

const getLangFromUrl = (pathname: string): string =>
  pathname
    .split('/')
    .filter(R.isEmpty)
    .find(R.match(/en|fr/)) || 'fr';

const getSlugFromUrl = (pathname: string): string =>
  R.pipe(
    R.split('/'),
    R.filter(R.isEmpty),
    R.reject(R.test(/en|fr/)),
    ([first]) => first,
    R.defaultTo<string>('profiles')
  )(pathname);

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const path = history.location.pathname;

  return getFacet() === 'lmel' ? (
    <StaticLayout
      pageContext={{
        langKey: getLangFromUrl(path),
        slug: getSlugFromUrl(path),
        title: 'Contributeurs'
      }}
      path={history.location.pathname}
    >
      {children}
    </StaticLayout>
  ) : (
    <>{children}</>
  );
};

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

render(<App />, document.getElementById('root'));
