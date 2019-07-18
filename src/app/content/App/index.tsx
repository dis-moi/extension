import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import theme from '../../theme';
import UI from './UI';
import store, { history } from '../store';
import { configureSentryScope } from '../../utils/sentry';
import GlobalStyle from '../GlobalStyle';

const DELAY_BEFORE_SHOWING = process.env.NODE_ENV === 'production' ? 4000 : 10;

interface AppProps {
  contentDocument: Document;
}
interface AppState {
  loaded: boolean;
}

export default class App extends React.PureComponent<AppProps, AppState> {
  state = {
    loaded: false
  };

  componentDidMount() {
    setTimeout(this.setLoaded, DELAY_BEFORE_SHOWING);
    configureSentryScope(scope => {
      scope.setTag('context', 'iframe');
    });
  }

  setLoaded = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { contentDocument } = this.props;
    const { loaded } = this.state;

    return (
      <StyleSheetManager target={contentDocument.head}>
        <Provider store={store}>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <ConnectedRouter history={history}>
              <UI loaded={loaded} />
            </ConnectedRouter>
          </ThemeProvider>
        </Provider>
      </StyleSheetManager>
    );
  }
}
