import React, {Fragment} from 'react';
import { ThemeProvider } from 'styled-components';
import { hot, setConfig } from 'react-hot-loader';
import theme from '../theme';
import Button from '../../components/atoms/Button';

const Sandbox = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Button>I'm purple!</Button>
    </Fragment>
  </ThemeProvider>
);

setConfig({ logLevel: 'debug' });

export default hot(module)(Sandbox);
