import { configure, addDecorator } from '@storybook/react';
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from '../src/app/theme';
import 'typeface-lato';
import 'typeface-sedgwick-ave';
import NotificationContainer from 'components/organisms/Notification/Container';

const Global = createGlobalStyle`
  body {
    background-color: grey;
  }
`;

addDecorator(getStory => (
  <div>
    <Global />
    <ThemeProvider theme={theme}>
      <NotificationContainer>
        {getStory()}
      </NotificationContainer>
    </ThemeProvider>
  </div>
));

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /stories.jsx?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
