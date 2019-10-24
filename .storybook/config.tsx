import { configure, addDecorator, RenderFunction } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import formStore from './formStore';
import optionsStore from 'app/options/store';
import theme from '../src/app/theme';
import 'typeface-lato';
import 'typeface-sedgwick-ave';

const Global = createGlobalStyle`
  body {
    background-color: grey;
  }
`;

export const formStoreDecorator = (getStory: RenderFunction) => (
  <Provider store={formStore}>
    <>{getStory()}</>
  </Provider>
);

export const optionsStoreDecorator = (getStory: RenderFunction) => (
  <Provider store={optionsStore}>
    <>{getStory()}</>
  </Provider>
);

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
