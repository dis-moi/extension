import React, { ReactElement } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { StoryFn } from '@storybook/addons';
import { select, withKnobs } from '@storybook/addon-knobs';
import 'typeface-lato';
import 'typeface-sedgwick-ave';
import 'libs/i18n';
import { lmelTheme, dismoiTheme } from '../src/libs/facets/theme';
import i18n, { options } from '../src/libs/i18n';

i18n.init(options).then(() => {});

const Global = createGlobalStyle`
  body {
    background-color: grey;
  }
`;

const themes = {
  dismoi: dismoiTheme,
  lmel: lmelTheme
} as const;

export const decorators = [
  withKnobs,
  (getStory: StoryFn<ReactElement>) => {
    const story = getStory();

    return (
      <>
        <Global />
        <ThemeProvider
          theme={
            themes[
              select(
                'theme',
                Object.keys(themes) as (keyof typeof themes)[],
                'dismoi'
              )
            ]
          }
        >
          <>{story}</>
        </ThemeProvider>
      </>
    );
  }
];
