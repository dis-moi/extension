import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import theme from '../../../../libs/theme';
import UI from './UI';
import index, { history } from '../store';
import { configureSentryScope } from '../../../../libs/utils/sentry';
import FontsStyle from 'libs/components/atoms/FontsStyle';
import GlobalStyle from './GlobalStyle';

interface AppProps {
  contentDocument: Document;
}

export default ({ contentDocument }: AppProps) => {
  useEffect(() => {
    configureSentryScope(scope => {
      scope.setTag('context', 'iframe');
    });
  }, [contentDocument]);

  return (
    <StyleSheetManager target={contentDocument.head}>
      <Provider store={index}>
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
