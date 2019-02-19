import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import NotificationFooter from './NotificationFooter';
import theme from '../../../app/theme';

const Global = createGlobalStyle`
  body {
    background-color: grey;
  }
`;

const Wrapper = styled.div`
  width: 384px;
  height: 414px;
`;

storiesOf('molecules/NotificationFooter', module)
  .addDecorator(getStory => (
    <div>
      <Global />
      <ThemeProvider theme={theme}>
        <Wrapper>
          {getStory()}
        </Wrapper>
      </ThemeProvider>
    </div>
  ))
  .add('On nothing', () => (
    <Router><NotificationFooter /></Router>
  ))
  .add('On notice', () => (
    <Router location="/notices"><NotificationFooter /></Router>
  ))
  .add('On subscriptions', () => (
    <Router location="/subscriptions"><NotificationFooter /></Router>
  ));
