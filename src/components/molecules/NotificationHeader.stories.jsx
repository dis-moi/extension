import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import NotificationHeader from './NotificationHeader';
import theme from '../../app/theme';

const Global = createGlobalStyle`
  body {
    background-color: grey;
  }
`;

const Wrapper = styled.div`
  width: 384px;
  height: 414px;
`;

storiesOf('molecules/NotificationHeader', module)
  .addDecorator(getStory => (
    <div>
      <Global />
      <Router>
        <ThemeProvider theme={theme}>
          <Wrapper>
            {getStory()}
          </Wrapper>
        </ThemeProvider>
      </Router>
    </div>
  ))
  .add('normal', () => (
    <NotificationHeader title="title" close={action('close')} onBack={action('onback')} />
  ));
