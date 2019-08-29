import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import store, { history } from '../store';
import SubscriptionsScreen from './SubscriptionsScreen/SubscriptionsScreen';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <SubscriptionsScreen />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
