import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import FontsStyle from 'components/atoms/FontsStyle';
import theme from '../../theme';
import store, { history } from '../store';
import UI from './UI';

const App = () => (
  <Provider store={store}>
    <FontsStyle getURL={(path: string) => path} />
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <UI />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
