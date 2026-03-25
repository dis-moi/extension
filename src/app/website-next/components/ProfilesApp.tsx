import React, { useRef } from 'react';
import { createBrowserHistory } from 'history';
import { createProfilesStore } from 'app/profiles/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'libs/store/router';
import Background from 'app/profiles/App/Background';
import PageContainer from 'app/profiles/App/PageContainer';
import Pages from 'app/profiles/App/Pages';
import { useTheme } from 'libs/facets/useTheme.hook';
import i18n, { options } from 'libs/i18n';

// Polyfill browser global for profiles code that expects it
/* eslint-disable @typescript-eslint/no-explicit-any */
if (typeof window !== 'undefined' && !(window as any).browser) {
  (window as any).browser =
    typeof chrome !== 'undefined'
      ? chrome
      : typeof (window as any).browser !== 'undefined'
      ? (window as any).browser
      : {};
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const ProfilesApp = () => {
  const theme = useTheme();
  const storeRef = useRef<ReturnType<typeof createProfilesStore> | null>(null);
  const historyRef = useRef<ReturnType<typeof createBrowserHistory> | null>(
    null
  );

  if (!storeRef.current) {
    historyRef.current = createBrowserHistory();
    storeRef.current = createProfilesStore(historyRef.current);
    i18n
      .init(options)
      .then(() => null)
      .catch(() => null);
  }

  return (
    <Provider store={storeRef.current}>
      <ThemeProvider theme={theme}>
        {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
        <ConnectedRouter history={historyRef.current!}>
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

export default ProfilesApp;
