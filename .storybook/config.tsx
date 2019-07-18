import { configure, addDecorator } from '@storybook/react';
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

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /stories.tsx?$/);

function loadStories() {
  req.keys().forEach((filename: string) => req(filename));
}

configure(loadStories, module);
