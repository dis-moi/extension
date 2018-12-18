import React from 'react';
import { ThemeProvider } from 'styled-components';
import { hot, setConfig } from 'react-hot-loader';
import theme from '../theme';

import {NotificationNavigation} from '../../components/organisms';

const Sandbox = () => (
  <ThemeProvider theme={theme}>
      <NotificationNavigation />
  </ThemeProvider>
);

setConfig({ logLevel: 'debug' });

export default hot(module)(Sandbox);
