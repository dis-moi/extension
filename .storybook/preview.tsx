import React, { ReactElement } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import 'typeface-lato';
import 'typeface-sedgwick-ave';
import theme from 'app/theme';
import 'libs/i18n';
import { StoryFn } from '@storybook/addons';
import i18n, { options } from '../src/libs/i18n';

const Global = createGlobalStyle`
  body {
    font-family: "Lato", Arial, sans-serif;
    background-color: grey;
  }
`;
i18n.init(options).then(() => {});
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
