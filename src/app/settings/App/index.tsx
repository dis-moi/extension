import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import Content from './Subscriptions/Subscriptions';
import store, { history } from '../store';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <Content />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
