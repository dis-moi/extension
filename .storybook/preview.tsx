import { addDecorator } from '@storybook/react';
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from '../src/app/theme';
import 'typeface-lato';
import 'typeface-sedgwick-ave';

const Global = createGlobalStyle`
  body {
    background-color: grey;
  }
`;

addDecorator(getStory => (
  <>
    <Global />
    <ThemeProvider theme={theme}>
      <>{getStory()}</>
    </ThemeProvider>
  </>
));
