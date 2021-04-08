import React, { ReactElement } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import 'typeface-lato';
import 'typeface-sedgwick-ave';
import theme from 'app/theme';
import 'i18n';
import { StoryFn } from '@storybook/addons';

const Global = createGlobalStyle`
  body {
    background-color: grey;
  }
`;

export const decorators = [
  (getStory: StoryFn<ReactElement>) => (
    <>
      <Global />
      <ThemeProvider theme={theme}>
        <>{getStory()}</>
      </ThemeProvider>
    </>
  )
];
