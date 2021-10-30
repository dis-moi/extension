import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import FontsStyle from 'components/atoms/FontsStyle';
import { useTheme } from 'libs/facets/useTheme.hook';
import { configureSentryScope } from 'libs/utils/sentry';
import store, { history } from '../store';
import UI from './UI';
import GlobalStyle from './GlobalStyle';

interface AppProps {
  contentDocument: Document;
}

export default ({ contentDocument }: AppProps) => {
  const theme = useTheme();
  useEffect(() => {
    configureSentryScope(scope => {
      scope.setTag('context', 'iframe');
    });
  }, [contentDocument]);

  return (
    <StyleSheetManager target={contentDocument.head}>
      <Provider store={store}>
        <FontsStyle getURL={browser.runtime.getURL} />
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <UI />
          </ConnectedRouter>
        </ThemeProvider>
      </Provider>
    </StyleSheetManager>
  );
};
