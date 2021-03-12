import { addDecorator } from '@storybook/react';
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import 'typeface-lato';
import 'typeface-sedgwick-ave';
import theme from 'app/theme';
import 'i18n';

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
