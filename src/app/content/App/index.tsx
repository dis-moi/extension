import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import { configureScope } from '@sentry/browser';
import theme from '../../theme';
import store, { history } from '../store';
import Content from './Content';

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
    configureScope((scope) => {
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
          <ThemeProvider theme={theme}>
            <ConnectedRouter history={history}>
              <Content loaded={loaded} />
            </ConnectedRouter>
          </ThemeProvider>
        </Provider>
      </StyleSheetManager>
    );
  }
}
