import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../../../../app/theme';
import { NotificationContainer } from '../../../atoms';
import About from './About';
import 'typeface-lato';
import 'typeface-sedgwick-ave';

const Global = createGlobalStyle`
  body {
    background-color: grey;
  }
`;

storiesOf('screens/NewAbout', module)
  .addDecorator(getStory => (
    <Router>
      <ThemeProvider theme={theme}>
        <NotificationContainer>
          <Global />
          {getStory()}
        </NotificationContainer>
      </ThemeProvider>
    </Router>
  ))
  .add('normal', () => <About extensionVersion="1.2.3" close={action('close')} installationDate="01/01/2042" />);
