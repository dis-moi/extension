import React, { ReactElement } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import 'typeface-lato';
import 'typeface-sedgwick-ave';
import { dismoiTheme } from 'app/theme';
import 'libs/i18n';
import { StoryFn } from '@storybook/addons';
import i18n, { options } from '../src/libs/i18n';

i18n.init(options).then(() => {});

const Global = createGlobalStyle`
  body {
    background-color: grey;
  }
`;

export const decorators = [
  (getStory: StoryFn<ReactElement>) => (
    <>
      <Global />
      <ThemeProvider theme={dismoiTheme}>
        <>{getStory()}</>
      </ThemeProvider>
    </>
  )
];
